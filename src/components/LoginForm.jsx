// LoginForm.jsx
import { useState } from 'react';
import '../css/LoginForm.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) {
      onLogin(trimmed);
    }
  }

  function onChange(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="login">
      <h1 className="app-title">📘 Classwork Tracker</h1>
      <form className="login__form" onSubmit={onSubmit}>
        <label>
          <span>Username:</span>
          <input
            className="login__username"
            value={username}
            onChange={onChange}
            placeholder="Please Enter Username"
          />
        </label>
        <button className="login__button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
