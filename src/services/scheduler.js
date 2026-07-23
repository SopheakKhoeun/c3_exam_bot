const cron = require('node-cron');
const { env } = require('../utils/env');
const { ScheduleService } = require('./scheduleService');

const scheduleService = new ScheduleService();

function startSchedulers(bot) {
  const jobs = [];

  const morning = cron.schedule(
    env.cronMorning,
    async () => {
      try {
        await scheduleService.sendAllCategories(bot, 'Morning (8:00 AM)');
      } catch (error) {
        console.error('[schedule] Morning job failed:', error);
      }
    },
    {
      timezone: env.timezone,
    }
  );

  const afternoon = cron.schedule(
    env.cronAfternoon,
    async () => {
      try {
        await scheduleService.sendAllCategories(bot, 'Afternoon (1:00 PM)');
      } catch (error) {
        console.error('[schedule] Afternoon job failed:', error);
      }
    },
    {
      timezone: env.timezone,
    }
  );

  jobs.push(morning, afternoon);

  console.log(
    `[schedule] Daily auto-send enabled at 08:00 and 13:00 (${env.timezone})`
  );

  return {
    stop() {
      jobs.forEach((job) => job.stop());
    },
  };
}

module.exports = { startSchedulers, scheduleService };
