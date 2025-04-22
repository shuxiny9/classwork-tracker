import express from 'express';
import cookieParser from 'cookie-parser';
import { makeClassworkList } from './classworks.js';
import sessions from './sessions.js';
import users from './users.js';

const app = express();
// PORT=4000 node server.js (Windows version:  SET PORT=4000 && node server.js)
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if (!existingUserData) {
    users.addUserData(username, makeClassworkList());
  }
  const classworkList = users.getUserData(username);
  res.cookie('sid', sid);
  res.json(classworkList.getClassworks());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }
  
  res.json({ username });
});

//classworks
app.get('/api/classworks', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getClassworks());
});

app.post('/api/classworks', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { title, dueDate } = req.body;
  if (!title || !dueDate) {
    res.status(400).json({ error: 'required-title-dueDate' });
    return;
  }
  const classworkList = users.getUserData(username);
  const id = classworkList.addClasswork(title, dueDate);
  res.json(classworkList.getClasswork(id));
});

app.get('/api/classworks/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const classworkList = users.getUserData(username);
  const { id } = req.params;
  if (!classworkList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No classwork with id ${id}` });
    return;
  }
  res.json(classworkList.getClasswork(id));
});

app.put('/api/classworks/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const classworkList = users.getUserData(username);
  const { id } = req.params;
  const { title, dueDate, done = false } = req.body;
  // Full Replacement required for a PUT
  if (!title || !dueDate) {
    res.status(400).json({ error: 'required-title-dueDate' });
    return;
  }
  if (!classworkList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No classwork with id ${id}` });
    return;
  }
  classworkList.updateClasswork(id, { title, dueDate, done });
  res.json(classworkList.getClasswork(id));
});

app.patch('/api/classworks/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { title, dueDate, done } = req.body;
  const classworkList = users.getUserData(username);
  if (!classworkList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No classwork with id ${id}` });
    return;
  }
  classworkList.updateClasswork(id, { title, dueDate, done });
  res.json(classworkList.getClasswork(id));
});

app.delete('/api/classworks/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const classworkList = users.getUserData(username);
  const exists = classworkList.contains(id);
  if (exists) {
    classworkList.deleteClasswork(id);
  }
  res.json({ message: exists ? `classwork ${id} deleted` : `classwork ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

