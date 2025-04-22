// AddClassworkForm.jsx
import { useState } from 'react';
import '../css/AddClassworkForm.css';

function AddClassworkForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    if (!title || !dueDate) return;

    onAdd(title, dueDate);  
    setTitle('');
    setDueDate('');
  }

  return (
    <form className="add__form" onSubmit={onSubmit}>
      <input
        className="add__title"
        placeholder="Work Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="add__due-date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" className="add__button">ADD</button>
    </form>
  );
}

export default AddClassworkForm;
