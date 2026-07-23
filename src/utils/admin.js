const { env } = require('./env');

function isAdmin(telegramId) {
  return String(telegramId) === String(env.adminTelegramId);
}

module.exports = { isAdmin };
