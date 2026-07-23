function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatQuestion(question) {
  const difficulty = question.difficulty
    ? `\nDifficulty: <b>${escapeHtml(question.difficulty)}</b>`
    : '';

  return (
    `<b>Category:</b> ${escapeHtml(question.category.name)}\n` +
    `${difficulty}\n\n` +
    `<b>Question</b>\n` +
    `${escapeHtml(question.title)}`
  );
}

function formatAnswer(question) {
  return (
    `<b>Answer</b>\n` +
    `${escapeHtml(question.answer)}\n\n` +
    `<b>Explanation</b>\n` +
    `${escapeHtml(question.explanation)}`
  );
}

function formatProgress(stats) {
  return (
    `<b>📊 Progress</b>\n\n` +
    `Questions Answered: <b>${stats.answered}</b>\n` +
    `Correct: <b>${stats.correct}</b>\n` +
    `Wrong: <b>${stats.wrong}</b>\n` +
    `Accuracy: <b>${stats.accuracy}%</b>`
  );
}

function formatWelcome(firstName) {
  const name = firstName ? escapeHtml(firstName) : 'there';
  return (
    `👋 Welcome ${name}!\n\n` +
    `Welcome to WMAD C3 Exam Prep Bot.\n\n` +
    `Practice from Skill 3–6 + Mini Store / Order Desk.\n\n` +
    `Choose a topic below.\n\n` +
    `Powered by @sopheak_dev`
  );
}

module.exports = {
  escapeHtml,
  formatQuestion,
  formatAnswer,
  formatProgress,
  formatWelcome,
};
