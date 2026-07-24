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
  ]);
}

function afterProgressKeyboard() {
  return mainMenuKeyboard();
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

module.exports = {
  MENU,
  mainMenuKeyboard,
  showAnswerKeyboard,
  markProgressKeyboard,
  afterProgressKeyboard,
  cancelKeyboard,
  categorySelectKeyboard,
};
