const {
  userService,
  categoryService,
  questionService,
  groupTopicService,
} = require('./index');
const { formatQuestion, escapeHtml } = require('../utils/format');
const { showAnswerKeyboard, mainMenuKeyboard } = require('../utils/keyboards');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatScheduleIntro(slotLabel) {
  return (
    `⏰ <b>${escapeHtml(slotLabel)} practice</b>\n\n` +
    `Here is one question from <b>each category</b>.\n` +
    `Tap <b>Show Answer</b> when you are ready.`
  );
}

function formatHourlyIntro() {
  return (
    `⏱ <b>Hourly practice drop</b>\n\n` +
    `Here is <b>1 random question</b> for this hour.\n` +
    `Tap <b>Show Answer</b> when you are ready.`
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

        await this.sendToChat(
          bot,
          chatId,
          formatScheduleIntro(slotLabel),
          {
            parse_mode: 'HTML',
            ...threadOptions(hourlyOrGeneral?.threadId),
          }
        );
        sent += 1;
        await sleep(100);

        for (const category of categories) {
          const question = await questionService.getRandom(category.name);
          if (!question) {
            continue;
          }

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
        ...threadOptions(target.threadId),
      });
      await sleep(80);
      await this.sendToChat(bot, target.chatId, formatQuestion(question), {
        parse_mode: 'HTML',
        ...showAnswerKeyboard(question.id),
        ...threadOptions(target.threadId),
      });
      sent = 2;
    } catch (error) {
      failed = 1;
      console.error('[schedule] Group hourly failed:', error.message);
    }

    return { sent, failed, skipped: false };
  }

  async sendAllCategories(bot, slotLabel = 'Daily') {
    const users = await userService.listAll();
    const categories = await categoryService.list();

    let sent = 0;
    let failed = 0;

    const groupResult = await this.sendAllCategoriesToGroup(bot, slotLabel);
    sent += groupResult.sent;
    failed += groupResult.failed;

    if (users.length === 0) {
      console.log('[schedule] No DM users; group-only mode possible');
      return {
        users: 0,
        sent,
        failed,
        group: groupResult,
      };
    }

    if (categories.length === 0) {
      return { users: users.length, sent, failed, group: groupResult };
    }

    console.log(
      `[schedule] DM pack: ${categories.length} categories → ${users.length} user(s) (${slotLabel})`
    );

    for (const user of users) {
      try {
        await bot.telegram.sendMessage(
          user.telegramId,
          formatScheduleIntro(slotLabel),
          {
            parse_mode: 'HTML',
            ...mainMenuKeyboard(),
          }
        );
        sent += 1;
        await sleep(80);

        for (const category of categories) {
          const question = await questionService.getRandom(category.name);
          if (!question) {
            continue;
          }

          await bot.telegram.sendMessage(
            user.telegramId,
            formatQuestion(question),
            {
              parse_mode: 'HTML',
              ...showAnswerKeyboard(question.id),
            }
          );
          sent += 1;
          await sleep(120);
        }
      } catch (error) {
        failed += 1;
        console.error(
          `[schedule] Failed for user ${user.telegramId}:`,
          error.message
        );
      }

      await sleep(250);
    }

    console.log(`[schedule] Done. messages≈${sent}, failures=${failed}`);
    return { users: users.length, sent, failed, group: groupResult };
  }

  async sendHourlyQuestion(bot) {
    const users = await userService.listAll();
    let sent = 0;
    let failed = 0;

    const groupResult = await this.sendHourlyToGroup(bot);
    sent += groupResult.sent;
    failed += groupResult.failed;

    if (users.length === 0) {
      console.log('[schedule] Hourly: no DM users');
      return { users: 0, sent, failed, group: groupResult };
    }

    console.log(`[schedule] Hourly DM drop to ${users.length} user(s)`);

    for (const user of users) {
      try {
        const question = await questionService.getRandom(null);
        if (!question) {
          console.log('[schedule] Hourly: no questions in database');
          break;
        }

        await bot.telegram.sendMessage(user.telegramId, formatHourlyIntro(), {
          parse_mode: 'HTML',
          ...mainMenuKeyboard(),
        });
        await sleep(60);

        await bot.telegram.sendMessage(
          user.telegramId,
          formatQuestion(question),
          {
            parse_mode: 'HTML',
            ...showAnswerKeyboard(question.id),
          }
        );
        sent += 2;
      } catch (error) {
        failed += 1;
        console.error(
          `[schedule] Hourly failed for user ${user.telegramId}:`,
          error.message
        );
      }

      await sleep(200);
    }

    console.log(
      `[schedule] Hourly done. messages≈${sent}, failures=${failed}`
    );
    return { users: users.length, sent, failed, group: groupResult };
  }
}

module.exports = { ScheduleService };
