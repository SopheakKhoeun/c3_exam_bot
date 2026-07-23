const {
  userService,
  categoryService,
  questionService,
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

class ScheduleService {
  /**
   * Send one random question per category to every registered user.
   */
  async sendAllCategories(bot, slotLabel = 'Daily') {
    const [users, categories] = await Promise.all([
      userService.listAll(),
      categoryService.list(),
    ]);

    if (users.length === 0) {
      console.log('[schedule] No users to notify');
      return { users: 0, sent: 0, failed: 0 };
    }

    if (categories.length === 0) {
      console.log('[schedule] No categories found');
      return { users: users.length, sent: 0, failed: 0 };
    }

    let sent = 0;
    let failed = 0;

    console.log(
      `[schedule] Sending ${categories.length} categories to ${users.length} user(s) (${slotLabel})`
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

    console.log(`[schedule] Done. messages≈${sent}, userFailures=${failed}`);
    return { users: users.length, sent, failed };
  }
}

module.exports = { ScheduleService };
