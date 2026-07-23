const {
  userService,
  questionService,
  progressService,
} = require('../services');
const {
  formatQuestion,
  formatAnswer,
  formatProgress,
  formatWelcome,
} = require('../utils/format');
const {
  mainMenuKeyboard,
  showAnswerKeyboard,
  markProgressKeyboard,
  afterProgressKeyboard,
} = require('../utils/keyboards');

async function sendQuestion(ctx, categoryName = null) {
  const question = await questionService.getRandom(categoryName);

  if (!question) {
    const label = categoryName || 'any category';
    await ctx.reply(`No questions found for ${label}. Seed the database first.`, {
      ...mainMenuKeyboard(),
    });
    return;
  }

  await ctx.reply(formatQuestion(question), {
    parse_mode: 'HTML',
    ...showAnswerKeyboard(question.id),
  });
}

async function handleBackend(ctx) {
  try {
    await sendQuestion(ctx, 'Backend');
  } catch (error) {
    console.error('handleBackend error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleFrontend(ctx) {
  try {
    await sendQuestion(ctx, 'Frontend');
  } catch (error) {
    console.error('handleFrontend error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleSql(ctx) {
  try {
    await sendQuestion(ctx, 'SQL');
  } catch (error) {
    console.error('handleSql error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleMongodb(ctx) {
  try {
    await sendQuestion(ctx, 'MongoDB');
  } catch (error) {
    console.error('handleMongodb error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleRandom(ctx) {
  try {
    if (ctx.callbackQuery) {
      await ctx.answerCbQuery();
    }
    await sendQuestion(ctx, null);
  } catch (error) {
    console.error('handleRandom error:', error);
    await ctx.reply('Failed to load random question. Please try again.');
  }
}

async function handleShowAnswer(ctx) {
  try {
    const questionId = Number(ctx.match[1]);
    const question = await questionService.getById(questionId);

    if (!question) {
      await ctx.answerCbQuery('Question not found');
      return;
    }

    await ctx.answerCbQuery();
    await ctx.editMessageText(
      `${formatQuestion(question)}\n\n${formatAnswer(question)}\n\nDid you get it right?`,
      {
        parse_mode: 'HTML',
        ...markProgressKeyboard(question.id),
      }
    );
  } catch (error) {
    console.error('handleShowAnswer error:', error);
    await ctx.reply('Failed to show answer. Please try again.');
  }
}

async function handleMarkProgress(ctx) {
  try {
    const questionId = Number(ctx.match[1]);
    const correct = ctx.match[2] === '1';

    const user = await userService.ensureUser(ctx.from);
    await progressService.record({
      userId: user.id,
      questionId,
      correct,
    });

    await ctx.answerCbQuery(correct ? 'Marked correct' : 'Marked wrong');
    await ctx.editMessageReplyMarkup(undefined);
    await ctx.reply(
      correct ? '✅ Recorded as correct.' : '❌ Recorded as wrong. Keep practicing!',
      { ...afterProgressKeyboard() }
    );
  } catch (error) {
    console.error('handleMarkProgress error:', error);
    await ctx.reply('Failed to save progress. Please try again.');
  }
}

async function handleProgress(ctx) {
  try {
    if (ctx.callbackQuery) {
      await ctx.answerCbQuery();
    }
    const user = await userService.ensureUser(ctx.from);
    const stats = await progressService.getStats(user.id);

    await ctx.reply(formatProgress(stats), {
      parse_mode: 'HTML',
      ...mainMenuKeyboard(),
    });
  } catch (error) {
    console.error('handleProgress error:', error);
    await ctx.reply('Failed to load progress. Please try again.');
  }
}

async function handleMenu(ctx) {
  try {
    if (ctx.callbackQuery) {
      await ctx.answerCbQuery();
    }
    await ctx.reply(formatWelcome(ctx.from.first_name), {
      ...mainMenuKeyboard(),
    });
  } catch (error) {
    console.error('handleMenu error:', error);
    await ctx.reply('Failed to open menu. Please try /start.');
  }
}

module.exports = {
  handleBackend,
  handleFrontend,
  handleSql,
  handleMongodb,
  handleRandom,
  handleShowAnswer,
  handleMarkProgress,
  handleProgress,
  handleMenu,
};
