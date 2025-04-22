const users = {};
/*
users = {
  "shuxin": {
    classworks: {
      "abc-123": { id: "abc-123", title: "React hw", dueDate: "2025-04-21", done: false },
      "xyz-456": { ... }
    },
    getClassworks: function() {...},
    addClasswork: function(title, dueDate) {...},
    ...
  },
  ...
}

   */
function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function getUserData(username) {
  return users[username];
}

function addUserData(username, userData) {
  users[username] = userData;
}

export default {
  isValid,
  getUserData,
  addUserData,
};
