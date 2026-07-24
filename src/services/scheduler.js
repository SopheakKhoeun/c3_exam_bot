const cron = require('node-cron');
const { env } = require('../utils/env');
const { ScheduleService } = require('./scheduleService');

const scheduleService = new ScheduleService();

function currentHourInTimezone(timeZone) {
  const hourText = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    hour12: false,
  }).format(new Date());
  return Number(hourText);
}

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

  const hourly = cron.schedule(
    env.cronHourly,
    async () => {
      try {
        // Avoid double-spam with the 08:00 / 13:00 all-category dumps
        const hour = currentHourInTimezone(env.timezone);
        if (hour === 8 || hour === 13) {
          console.log(
            `[schedule] Skipping hourly drop at ${hour}:00 (daily pack runs instead)`
          );
          return;
        }

        await scheduleService.sendHourlyQuestion(bot);
      } catch (error) {
        console.error('[schedule] Hourly job failed:', error);
      }
    },
    {
      timezone: env.timezone,
    }
  );

  jobs.push(morning, afternoon, hourly);

  console.log(
    `[schedule] Daily packs at 08:00 & 13:00; hourly 1-question drop every hour (${env.timezone})`
  );

  return {
    stop() {
      jobs.forEach((job) => job.stop());
    },
  };
}

module.exports = { startSchedulers, scheduleService };
