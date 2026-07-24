const { userService } = require('../services');
const { formatWelcome } = require('../utils/format');
const {
  practiceMenuFor,
  withThread,
  isGroupChat,
} = require('../utils/keyboards');

async function startCommand(ctx) {
  try {
    await userService.ensureUser(ctx.from);

    const extra = isGroupChat(ctx)
      ? 'Practice together in this group topic.\nTap a button below.'
      : null;

    const welcome = formatWelcome(ctx.from.first_name);
    const text = extra ? `${welcome}\n\n${extra}` : welcome;

    await ctx.reply(text, withThread(ctx, practiceMenuFor(ctx)));
  } catch (error) {
    console.error('startCommand error:', error);
    await ctx.reply('Something went wrong. Please try again.');
  }
}

module.exports = { startCommand };
