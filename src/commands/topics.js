const { isAdmin } = require('../utils/admin');
const { groupTopicService } = require('../services');
const {
  practiceMenuFor,
  withThread,
} = require('../utils/keyboards');

function getChatMeta(ctx) {
  const chat = ctx.chat || {};
  const message = ctx.message || ctx.channelPost || {};
  return {
    chatId: chat.id,
    chatType: chat.type,
    chatTitle: chat.title || chat.username || String(chat.id),
    isForum: Boolean(chat.is_forum),
    threadId: message.message_thread_id || null,
  };
}

async function whereAmICommand(ctx) {
  try {
    const meta = getChatMeta(ctx);
    await ctx.reply(
      `<b>Chat info</b>\n\n` +
        `Title: ${meta.chatTitle}\n` +
        `chat_id: <code>${meta.chatId}</code>\n` +
        `type: ${meta.chatType}\n` +
        `forum/topics: ${meta.isForum ? 'yes' : 'no'}\n` +
        `message_thread_id: <code>${meta.threadId ?? 'none'}</code>\n\n` +
        `<b>Quick fix if /topics failed</b>\n` +
        `1) Group → Administrators → WMAD bot → enable <b>Manage Topics</b>\n` +
        `2) Or create topic manually, open it, run <code>/bind Hourly</code>\n` +
        `3) Then <code>/sendhourly</code>`,
      withThread(ctx, { parse_mode: 'HTML' })
    );
  } catch (error) {
    console.error('whereAmICommand error:', error);
    await ctx.reply('Failed to read chat info.');
  }
}

async function topicsCommand(ctx) {
  try {
    if (!isAdmin(ctx.from.id)) {
      await ctx.reply('⛔ Admin only.');
      return;
    }

    const meta = getChatMeta(ctx);
    if (!['group', 'supergroup'].includes(meta.chatType)) {
      await ctx.reply('Run /topics inside your WMAD C3 Bot group.');
      return;
    }

    if (!meta.isForum) {
      await ctx.reply(
        'Enable Topics first:\nGroup settings → Topics → On\nThen make the bot admin with Manage Topics.'
      );
      return;
    }

    await ctx.reply(
      'Creating forum topics (Hourly + each category)...',
      withThread(ctx)
    );
    const result = await groupTopicService.createDefaultTopics(
      ctx.telegram,
      meta.chatId
    );

    const createdText =
      result.created.length > 0
        ? result.created.map((t) => `• ${t.name} (#${t.threadId})`).join('\n')
        : '(none)';
    const skippedText =
      result.skipped.length > 0
        ? result.skipped.map((n) => `• ${n}`).join('\n')
        : '(none)';

    const rightsFailed = result.skipped.some((s) =>
      String(s).includes('not enough rights')
    );

    let help = '';
    if (rightsFailed || result.created.length === 0) {
      help =
        `\n\n⚠️ Bot cannot create topics yet.\n` +
        `Fix: Group → Administrators → <b>WMAD C3 Exam Prep Bot</b> → enable <b>Manage Topics</b>\n` +
        `Then run /topics again.\n\n` +
        `<b>Or manual setup now:</b>\n` +
        `1. Create topics: Hourly, Backend, Frontend, ...\n` +
        `2. Open each topic and run e.g. <code>/bind Hourly</code>\n` +
        `3. Or in General run <code>/bind Hourly</code> to use General temporarily`;
    } else {
      help =
        `\n\nUsers: open a topic → /start → tap buttons to practice in that topic.`;
    }

    await ctx.reply(
      `Topics setup result.\n\n` +
        `<b>Created</b>\n${createdText}\n\n` +
        `<b>Skipped</b>\n${skippedText}` +
        help,
      withThread(ctx, { parse_mode: 'HTML', ...practiceMenuFor(ctx) })
    );
  } catch (error) {
    console.error('topicsCommand error:', error);
    await ctx.reply(
      `Failed to create topics: ${error.message}\n` +
        `Enable Manage Topics for the bot, or use /bind manually.`
    );
  }
}

async function bindCommand(ctx) {
  try {
    if (!isAdmin(ctx.from.id)) {
      await ctx.reply('⛔ Admin only.');
      return;
    }

    const meta = getChatMeta(ctx);
    if (!['group', 'supergroup'].includes(meta.chatType)) {
      await ctx.reply('Run /bind inside a group topic.');
      return;
    }

    const parts = (ctx.message.text || '').trim().split(/\s+/);
    const name = parts.slice(1).join(' ').trim();
    if (!name) {
      await ctx.reply(
        'Usage:\n/bind Hourly\n/bind Backend\n\nStand inside the topic first.'
      );
      return;
    }

    // General topic often has no thread id in some clients — use 1
    const threadId = meta.threadId || 1;

    const saved = await groupTopicService.bind({
      chatId: meta.chatId,
      name,
      threadId,
    });

    await ctx.reply(
      `✅ Bound <b>${saved.name}</b>\n` +
        `chat: <code>${saved.chatId}</code>\n` +
        `thread: <code>${saved.threadId}</code>\n\n` +
        `Now /sendhourly posts here (if name is Hourly).\n` +
        `Users can /start and practice in this topic.`,
      withThread(ctx, { parse_mode: 'HTML', ...practiceMenuFor(ctx) })
    );
  } catch (error) {
    console.error('bindCommand error:', error);
    await ctx.reply(`Failed to bind topic: ${error.message}`);
  }
}

async function listTopicsCommand(ctx) {
  try {
    if (!isAdmin(ctx.from.id)) {
      await ctx.reply('⛔ Admin only.');
      return;
    }

    const topics = await groupTopicService.list();
    if (topics.length === 0) {
      await ctx.reply(
        'No topics bound yet.\nRun /topics (needs Manage Topics) or /bind Hourly'
      );
      return;
    }

    const lines = topics.map(
      (t) =>
        `• <b>${t.name}</b> — chat <code>${t.chatId}</code> thread <code>${t.threadId}</code>`
    );
    await ctx.reply(`<b>Bound topics</b>\n\n${lines.join('\n')}`, {
      parse_mode: 'HTML',
    });
  } catch (error) {
    console.error('listTopicsCommand error:', error);
    await ctx.reply('Failed to list topics.');
  }
}

async function practiceCommand(ctx) {
  try {
    const { handlePracticeHere } = require('./actions');
    await handlePracticeHere(ctx);
  } catch (error) {
    console.error('practiceCommand error:', error);
    await ctx.reply('Failed to start practice.');
  }
}

module.exports = {
  whereAmICommand,
  topicsCommand,
  bindCommand,
  listTopicsCommand,
  practiceCommand,
};
