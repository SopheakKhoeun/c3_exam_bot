const { startCommand } = require('./start');
const {
  addCommand,
  handleAddCategorySelect,
  handleAddCancel,
  handleAddText,
} = require('./add');
const { sendNowCommand } = require('./sendNow');
const {
  handleBackend,
  handleFrontend,
  handleFullstack,
  handleSql,
  handleMongodb,
  handleRandom,
  handleShowAnswer,
  handleMarkProgress,
  handleProgress,
  handleMenu,
} = require('./actions');
const { MENU } = require('../utils/keyboards');

function registerCommands(bot) {
  bot.start(startCommand);
  bot.command('add', addCommand);
  bot.command('sendnow', sendNowCommand);

  bot.hears(MENU.BACKEND, handleBackend);
  bot.hears(MENU.FRONTEND, handleFrontend);
  bot.hears(MENU.FULLSTACK, handleFullstack);
  bot.hears(MENU.SQL, handleSql);
  bot.hears(MENU.MONGODB, handleMongodb);
  bot.hears(MENU.RANDOM, handleRandom);
  bot.hears(MENU.PROGRESS, handleProgress);

  bot.action('menu', handleMenu);
  bot.action('random', handleRandom);
  bot.action('progress', handleProgress);
  bot.action(/^answer:(\d+)$/, handleShowAnswer);
  bot.action(/^mark:(\d+):([01])$/, handleMarkProgress);

  bot.action(/^add:cat:(\d+)$/, handleAddCategorySelect);
  bot.action('add:cancel', handleAddCancel);

  bot.on('text', handleAddText);
}

module.exports = { registerCommands };
