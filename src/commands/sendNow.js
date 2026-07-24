const { isAdmin } = require('../utils/admin');
const { scheduleService } = require('../services/scheduler');

async function sendNowCommand(ctx) {
  try {
    if (!isAdmin(ctx.from.id)) {
      await ctx.reply('⛔ This command is restricted to admins.');
      return;
    }

    await ctx.reply('📤 Sending one question from each category to all users...');
    const result = await scheduleService.sendAllCategories(
      ctx,
      'Manual send'
    );
    await ctx.reply(
      `Done.\nUsers: ${result.users}\nMessages sent: ${result.sent}\nUser failures: ${result.failed}`
    );
  } catch (error) {
    console.error('sendNowCommand error:', error);
    await ctx.reply('Failed to run scheduled send. Check server logs.');
  }
}

async function sendHourlyNowCommand(ctx) {
  try {
    if (!isAdmin(ctx.from.id)) {
      await ctx.reply('⛔ This command is restricted to admins.');
      return;
    }

    await ctx.reply('⏱ Sending hourly 1-question drop to all users...');
    const result = await scheduleService.sendHourlyQuestion(ctx);
    await ctx.reply(
      `Done.\nUsers: ${result.users}\nMessages sent: ${result.sent}\nUser failures: ${result.failed}`
    );
  } catch (error) {
    console.error('sendHourlyNowCommand error:', error);
    await ctx.reply('Failed to run hourly send. Check server logs.');
  }
}

module.exports = { sendNowCommand, sendHourlyNowCommand };
