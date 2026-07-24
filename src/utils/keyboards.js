const { Markup } = require('telegraf');

const MENU = {
  BACKEND: '📚 Backend',
  FRONTEND: '🎨 Frontend',
  FULLSTACK: '🛒 Fullstack',
  SQL: '🗄 SQL',
  MONGODB: '🍃 MongoDB',
  RANDOM: '🎲 Random Question',
  PROGRESS: '📊 Progress',
};

function mainMenuKeyboard() {
  return Markup.keyboard([
    [MENU.BACKEND, MENU.FRONTEND],
    [MENU.FULLSTACK, MENU.SQL],
    [MENU.MONGODB, MENU.RANDOM],
    [MENU.PROGRESS],
  ]).resize();
}

/** Inline menu for groups/topics (reply keyboards are weak in forum topics). */
function groupPracticeKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('📚 Backend', 'cat:Backend'),
      Markup.button.callback('🎨 Frontend', 'cat:Frontend'),
    ],
    [
      Markup.button.callback('🛒 Fullstack', 'cat:Fullstack'),
      Markup.button.callback('🗄 SQL', 'cat:SQL'),
    ],
    [
      Markup.button.callback('🍃 MongoDB', 'cat:MongoDB'),
      Markup.button.callback('🎲 Random', 'random'),
    ],
    [Markup.button.callback('▶️ Practice in this topic', 'practice_here')],
    [Markup.button.callback('📊 Progress', 'progress')],
  ]);
}

function showAnswerKeyboard(questionId) {
  return Markup.inlineKeyboard([
    [Markup.button.callback('👁 Show Answer', `answer:${questionId}`)],
  ]);
}

function markProgressKeyboard(questionId) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('✅ Correct', `mark:${questionId}:1`),
      Markup.button.callback('❌ Wrong', `mark:${questionId}:0`),
    ],
    [Markup.button.callback('▶️ Another here', 'practice_here')],
  ]);
}

function afterProgressKeyboard() {
  return groupPracticeKeyboard();
}

function cancelKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('❌ Cancel', 'add:cancel')],
  ]);
}

function categorySelectKeyboard(categories) {
  const rows = categories.map((category) => [
    Markup.button.callback(category.name, `add:cat:${category.id}`),
  ]);
  rows.push([Markup.button.callback('❌ Cancel', 'add:cancel')]);
  return Markup.inlineKeyboard(rows);
}

function isGroupChat(ctx) {
  return ['group', 'supergroup'].includes(ctx.chat?.type);
}

function threadIdFromCtx(ctx) {
  return (
    ctx.message?.message_thread_id ||
    ctx.callbackQuery?.message?.message_thread_id ||
    null
  );
}

function withThread(ctx, extra = {}) {
  const threadId = threadIdFromCtx(ctx);
  return {
    ...extra,
    ...(threadId ? { message_thread_id: threadId } : {}),
  };
}

function practiceMenuFor(ctx) {
  return isGroupChat(ctx) ? groupPracticeKeyboard() : mainMenuKeyboard();
}

module.exports = {
  MENU,
  mainMenuKeyboard,
  groupPracticeKeyboard,
  showAnswerKeyboard,
  markProgressKeyboard,
  afterProgressKeyboard,
  cancelKeyboard,
  categorySelectKeyboard,
  isGroupChat,
  threadIdFromCtx,
  withThread,
  practiceMenuFor,
};
