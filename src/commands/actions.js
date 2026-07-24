const {
  userService,
  questionService,
  progressService,
  groupTopicService,
} = require('../services');
const {
  formatQuestion,
  formatAnswer,
  formatProgress,
  formatWelcome,
} = require('../utils/format');
const {
  showAnswerKeyboard,
  markProgressKeyboard,
  afterProgressKeyboard,
  practiceMenuFor,
  withThread,
  isGroupChat,
  threadIdFromCtx,
} = require('../utils/keyboards');

async function sendQuestion(ctx, categoryName = null) {
  const question = await questionService.getRandom(categoryName);

  if (!question) {
    const label = categoryName || 'any category';
    await ctx.reply(
      `No questions found for ${label}. Seed the database first.`,
      withThread(ctx, practiceMenuFor(ctx))
    );
    return;
  }

  await ctx.reply(
    formatQuestion(question),
    withThread(ctx, {
      parse_mode: 'HTML',
      ...showAnswerKeyboard(question.id),
    })
  );
}

async function handleBackend(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
    await sendQuestion(ctx, 'Backend');
  } catch (error) {
    console.error('handleBackend error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleFrontend(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
    await sendQuestion(ctx, 'Frontend');
  } catch (error) {
    console.error('handleFrontend error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleSql(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
    await sendQuestion(ctx, 'SQL');
  } catch (error) {
    console.error('handleSql error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleMongodb(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
    await sendQuestion(ctx, 'MongoDB');
  } catch (error) {
    console.error('handleMongodb error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleFullstack(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
    await sendQuestion(ctx, 'Fullstack');
  } catch (error) {
    console.error('handleFullstack error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleCategoryCallback(ctx) {
  try {
    const categoryName = ctx.match[1];
    await ctx.answerCbQuery();
    await sendQuestion(ctx, categoryName);
  } catch (error) {
    console.error('handleCategoryCallback error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handlePracticeHere(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();

    let categoryName = null;
    if (isGroupChat(ctx)) {
      const threadId = threadIdFromCtx(ctx);
      if (threadId) {
        const bound = await groupTopicService.getByThread(ctx.chat.id, threadId);
        if (bound && bound.name !== 'Hourly') {
          categoryName = bound.name;
        }
      }
    }

    await sendQuestion(ctx, categoryName);
  } catch (error) {
    console.error('handlePracticeHere error:', error);
    await ctx.reply('Failed to load question. Please try again.');
  }
}

async function handleRandom(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
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
      correct
        ? '✅ Recorded as correct.'
        : '❌ Recorded as wrong. Keep practicing!',
      withThread(ctx, afterProgressKeyboard())
    );
  } catch (error) {
    console.error('handleMarkProgress error:', error);
    await ctx.reply('Failed to save progress. Please try again.');
  }
}

async function handleProgress(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
    const user = await userService.ensureUser(ctx.from);
    const stats = await progressService.getStats(user.id);

    await ctx.reply(
      formatProgress(stats),
      withThread(ctx, {
        parse_mode: 'HTML',
        ...practiceMenuFor(ctx),
      })
    );
  } catch (error) {
    console.error('handleProgress error:', error);
    await ctx.reply('Failed to load progress. Please try again.');
  }
}

async function handleMenu(ctx) {
  try {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
    await ctx.reply(
      formatWelcome(ctx.from.first_name),
      withThread(ctx, practiceMenuFor(ctx))
    );
  } catch (error) {
    console.error('handleMenu error:', error);
    await ctx.reply('Failed to open menu. Please try /start.');
  }
}

module.exports = {
  handleBackend,
  handleFrontend,
  handleFullstack,
  handleSql,
  handleMongodb,
  handleCategoryCallback,
  handlePracticeHere,
  handleRandom,
  handleShowAnswer,
  handleMarkProgress,
  handleProgress,
  handleMenu,
};
