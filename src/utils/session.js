const sessions = new Map();

function getSession(userId) {
  const key = String(userId);
  if (!sessions.has(key)) {
    sessions.set(key, {});
  }
  return sessions.get(key);
}

function clearSession(userId) {
  sessions.delete(String(userId));
}

function setAddFlow(userId, data) {
  const session = getSession(userId);
  session.addFlow = { ...session.addFlow, ...data };
  return session.addFlow;
}

function getAddFlow(userId) {
  return getSession(userId).addFlow || null;
}

function clearAddFlow(userId) {
  const session = getSession(userId);
  delete session.addFlow;
}

module.exports = {
  getSession,
  clearSession,
  setAddFlow,
  getAddFlow,
  clearAddFlow,
};
