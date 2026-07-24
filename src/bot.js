const express = require('express');
const { Telegraf } = require('telegraf');
const { env } = require('./utils/env');
const { prisma } = require('./database/prisma');
const { categoryService } = require('./services');
const { registerCommands } = require('./commands');
const { startSchedulers } = require('./services/scheduler');

const DEFAULT_CATEGORIES = [
  'Backend',
  'Frontend',
  'Fullstack',
  'Prisma',
  'SQL',
  'MongoDB',
  'React',
  'Express',
  'Tailwind',
];

async function createApp() {
  const app = express();
  const bot = new Telegraf(env.botToken);

  app.get('/health', async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ status: 'ok', service: 'WMAD C3 Exam Prep Bot' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  registerCommands(bot);

  bot.catch((error, ctx) => {
    console.error('Bot error:', error);
    if (ctx && typeof ctx.reply === 'function') {
      ctx.reply('An unexpected error occurred. Please try again.').catch(() => {});
    }
  });

  return { app, bot };
}

async function bootstrap() {
  try {
    await prisma.$connect();
    await categoryService.ensureDefaults(DEFAULT_CATEGORIES);

    const { app, bot } = await createApp();

    app.listen(env.port, () => {
      console.log(`Health server listening on http://localhost:${env.port}/health`);
    });

    await bot.launch();
    console.log('WMAD C3 Exam Prep Bot is running');

    const scheduler = startSchedulers(bot);

    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down...`);
      scheduler.stop();
      bot.stop(signal);
      await prisma.$disconnect();
      process.exit(0);
    };

    process.once('SIGINT', () => shutdown('SIGINT'));
    process.once('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('Failed to start bot:', error);
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }
}

bootstrap();
