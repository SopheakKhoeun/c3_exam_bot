const {
  userService,
  categoryService,
  questionService,
  groupTopicService,
} = require('./index');
const { env } = require('../utils/env');
const { formatQuestion, escapeHtml } = require('../utils/format');
const {
  showAnswerKeyboard,
  mainMenuKeyboard,
  groupPracticeKeyboard,
} = require('../utils/keyboards');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatScheduleIntro(slotLabel) {
  return (
    `⏰ <b>${escapeHtml(slotLabel)} practice</b>\n\n` +
    `Practice in this group topic.\n` +
    `Tap <b>Show Answer</b>, then mark Correct/Wrong.`
  );
}

function formatHourlyIntro() {
  return (
    `⏱ <b>Hourly practice drop</b>\n\n` +
    `1 random question for everyone in this topic.\n` +
    `Tap <b>Show Answer</b> when ready.`
  );
}

function threadOptions(threadId) {
  if (threadId == null) {
    return {};
  }
  return { message_thread_id: Number(threadId) };
}

class ScheduleService {
  async sendToChat(bot, chatId, text, extra = {}) {
    return bot.telegram.sendMessage(chatId, text, extra);
  }

  async sendAllCategoriesToGroup(bot, slotLabel = 'Daily') {
    const topics = await groupTopicService.list();
    if (topics.length === 0) {
      console.log('[schedule] No group topics bound — skip group pack');
      return { sent: 0, failed: 0, skipped: true };
    }

    const chatIds = [...new Set(topics.map((t) => t.chatId))];
    const categories = await categoryService.list();
    let sent = 0;
    let failed = 0;

    for (const chatId of chatIds) {
      try {
        const hourlyOrGeneral = topics.find(
          (t) => t.chatId === chatId && t.name === 'Hourly'
        );

        await this.sendToChat(bot, chatId, formatScheduleIntro(slotLabel), {
          parse_mode: 'HTML',
          ...groupPracticeKeyboard(),
          ...threadOptions(hourlyOrGeneral?.threadId),
        });
        sent += 1;
        await sleep(100);

        for (const category of categories) {
          const question = await questionService.getRandom(category.name);
          if (!question) continue;

          const topic = topics.find(
            (t) => t.chatId === chatId && t.name === category.name
          );

          await this.sendToChat(bot, chatId, formatQuestion(question), {
            parse_mode: 'HTML',
            ...showAnswerKeyboard(question.id),
            ...threadOptions(topic?.threadId || hourlyOrGeneral?.threadId),
          });
          sent += 1;
          await sleep(150);
        }
      } catch (error) {
        failed += 1;
        console.error(`[schedule] Group pack failed (${chatId}):`, error.message);
      }
    }

    return { sent, failed, skipped: false };
  }

  async sendHourlyToGroup(bot) {
    const target = await groupTopicService.getHourlyTarget();
    if (!target) {
      console.log(
        '[schedule] No Hourly topic bound — run /bind Hourly in the group topic'
      );
      return { sent: 0, failed: 0, skipped: true };
    }

    const question = await questionService.getRandom(null);
    if (!question) {
      return { sent: 0, failed: 0, skipped: true };
    }

    let sent = 0;
    let failed = 0;

    try {
      await this.sendToChat(bot, target.chatId, formatHourlyIntro(), {
        parse_mode: 'HTML',
        ...groupPracticeKeyboard(),
        ...threadOptions(target.threadId),
      });
      await sleep(80);
      await this.sendToChat(bot, target.chatId, formatQuestion(question), {
        parse_mode: 'HTML',
        ...showAnswerKeyboard(question.id),
        ...threadOptions(target.threadId),
      });
      sent = 2;
      console.log(
        `[schedule] Hourly posted to group ${target.chatId} topic ${target.threadId}`
      );
    } catch (error) {
      failed = 1;
      console.error('[schedule] Group hourly failed:', error.message);
    }

    return { sent, failed, skipped: false };
  }

  async sendAllCategories(bot, slotLabel = 'Daily') {
    let sent = 0;
    let failed = 0;

    const groupResult = await this.sendAllCategoriesToGroup(bot, slotLabel);
    sent += groupResult.sent;
    failed += groupResult.failed;

    if (!env.scheduleDm) {
      console.log('[schedule] SCHEDULE_DM=false — skipping private DMs');
      return { users: 0, sent, failed, group: groupResult };
    }

    const users = await userService.listAll();
    const categories = await categoryService.list();
    if (users.length === 0 || categories.length === 0) {
      return { users: users.length, sent, failed, group: groupResult };
    }

    for (const user of users) {
      try {
        await bot.telegram.sendMessage(
          user.telegramId,
          formatScheduleIntro(slotLabel),
          { parse_mode: 'HTML', ...mainMenuKeyboard() }
        );
        sent += 1;
        await sleep(80);

        for (const category of categories) {
          const question = await questionService.getRandom(category.name);
          if (!question) continue;
          await bot.telegram.sendMessage(
            user.telegramId,
            formatQuestion(question),
            { parse_mode: 'HTML', ...showAnswerKeyboard(question.id) }
          );
          sent += 1;
          await sleep(120);
        }
      } catch (error) {
        failed += 1;
        console.error(`[schedule] DM failed ${user.telegramId}:`, error.message);
      }
      await sleep(250);
    }

    return { users: users.length, sent, failed, group: groupResult };
  }

  async sendHourlyQuestion(bot) {
    let sent = 0;
    let failed = 0;

    const groupResult = await this.sendHourlyToGroup(bot);
    sent += groupResult.sent;
    failed += groupResult.failed;

    if (!env.scheduleDm) {
      console.log('[schedule] SCHEDULE_DM=false — skipping private DMs');
      return { users: 0, sent, failed, group: groupResult };
    }

    const users = await userService.listAll();
    for (const user of users) {
      try {
        const question = await questionService.getRandom(null);
        if (!question) break;
        await bot.telegram.sendMessage(user.telegramId, formatHourlyIntro(), {
          parse_mode: 'HTML',
          ...mainMenuKeyboard(),
        });
        await sleep(60);
        await bot.telegram.sendMessage(
          user.telegramId,
          formatQuestion(question),
          { parse_mode: 'HTML', ...showAnswerKeyboard(question.id) }
        );
        sent += 2;
      } catch (error) {
        failed += 1;
        console.error(`[schedule] Hourly DM failed ${user.telegramId}:`, error.message);
      }
      await sleep(200);
    }

    return { users: users.length, sent, failed, group: groupResult };
  }
}

module.exports = { ScheduleService };
