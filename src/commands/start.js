const { userService } = require('../services');
const { formatWelcome } = require('../utils/format');
const { mainMenuKeyboard } = require('../utils/keyboards');

async function startCommand(ctx) {
  try {
    await userService.ensureUser(ctx.from);
    await ctx.reply(formatWelcome(ctx.from.first_name), mainMenuKeyboard());
  } catch (error) {
    console.error('startCommand error:', error);
    await ctx.reply('Something went wrong. Please try again.');
  }
}

module.exports = { startCommand };
