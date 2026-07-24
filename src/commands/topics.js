const { isAdmin } = require('../utils/admin');
const { groupTopicService } = require('../services');

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
        `message_thread_id: <code>${meta.threadId ?? 'none (General or private)'}</code>\n\n` +
        `Use /topics in this group (as admin) to create category topics.\n` +
        `Or open a topic and run /bind Hourly`,
      { parse_mode: 'HTML' }
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
        'This group does not have Topics enabled.\n\n' +
          'Telegram → Group settings → Topics → Enable, then try again.\n' +
          'Also make the bot an admin with Manage Topics permission.'
      );
      return;
    }

    await ctx.reply('Creating forum topics (Hourly + each category)...');
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

    await ctx.reply(
      `✅ Topics setup done.\n\n` +
        `<b>Created</b>\n${createdText}\n\n` +
        `<b>Skipped</b>\n${skippedText}\n\n` +
        `Hourly drops go to topic <b>Hourly</b>.\n` +
        `Daily packs post each category into its matching topic.`,
      { parse_mode: 'HTML' }
    );
  } catch (error) {
    console.error('topicsCommand error:', error);
    await ctx.reply(
      `Failed to create topics: ${error.message}\n` +
        `Make sure the bot is admin with "Manage Topics".`
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

    if (!meta.threadId) {
      await ctx.reply(
        'Open a specific topic (not All Messages), then run:\n' +
          '/bind Hourly\n' +
          '/bind Backend'
      );
      return;
    }

    const parts = (ctx.message.text || '').trim().split(/\s+/);
    const name = parts.slice(1).join(' ').trim();
    if (!name) {
      await ctx.reply('Usage: /bind Hourly   or   /bind Backend');
      return;
    }

    const saved = await groupTopicService.bind({
      chatId: meta.chatId,
      name,
      threadId: meta.threadId,
    });

    await ctx.reply(
      `✅ Bound topic <b>${saved.name}</b>\n` +
        `chat_id: <code>${saved.chatId}</code>\n` +
        `thread_id: <code>${saved.threadId}</code>`,
      { parse_mode: 'HTML' }
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
      await ctx.reply('No topics bound yet. Run /topics in your group.');
      return;
    }

    const lines = topics.map(
      (t) => `• <b>${t.name}</b> — chat <code>${t.chatId}</code> thread <code>${t.threadId}</code>`
    );
    await ctx.reply(`<b>Bound topics</b>\n\n${lines.join('\n')}`, {
      parse_mode: 'HTML',
    });
  } catch (error) {
    console.error('listTopicsCommand error:', error);
    await ctx.reply('Failed to list topics.');
  }
}

module.exports = {
  whereAmICommand,
  topicsCommand,
  bindCommand,
  listTopicsCommand,
};
