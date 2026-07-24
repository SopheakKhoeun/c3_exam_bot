require('dotenv').config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

const env = {
  botToken: requireEnv('BOT_TOKEN'),
  databaseUrl: requireEnv('DATABASE_URL'),
  adminTelegramId: requireEnv('ADMIN_TELEGRAM_ID'),
  port: Number(process.env.PORT || 3000),
  timezone: process.env.TZ_SCHEDULE || process.env.TZ || 'Asia/Phnom_Penh',
  // Default: every day at 08:00 and 13:00
  cronMorning: process.env.CRON_MORNING || '0 8 * * *',
  cronAfternoon: process.env.CRON_AFTERNOON || '0 13 * * *',
  // Default: every hour at minute 0
  cronHourly: process.env.CRON_HOURLY || '0 * * * *',
};

module.exports = { env };
