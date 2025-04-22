// ClassworkItem.jsx
import { useState } from 'react';
import '../css/ClassworkItem.css';

function ClassworkItem({ classwork, isLastAdded, onToggle, onDelete, onEdit }) {
  const isDoneClass = classwork.done ? 'classwork__title--done' : '';
  const isNewClass = isLastAdded ? 'classwork__title--new' : '';

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(classwork.title);
  const [editDueDate, setEditDueDate] = useState(classwork.dueDate);

  function handleSave() {
    
    onEdit(classwork.id, {
      title: editTitle,
      dueDate: editDueDate,
      done: classwork.done,
    });
    setIsEditing(false);
  }

  return (
    <div className="classwork">
      <label>
        <input
          type="checkbox"
          checked={classwork.done}
          onChange={() => onToggle(classwork.id)}
        />
        {isEditing ? (
          <span className="classwork__edit-form">
            <input
              className="edit__title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              type="date"
              className="edit__date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
            <button className="save__button" onClick={handleSave}>✅</button>
          </span>
        ) : (
          <span className={`classwork__title ${isDoneClass} ${isNewClass}`}>
            {classwork.title}（Due：{classwork.dueDate}）
          </span>
        )}
      </label>

      {!isEditing && (
        <button className="edit__button" onClick={() => setIsEditing(true)}>✏️</button>
      )}

      <button className="classwork__delete" onClick={() => onDelete(classwork.id)}>❌</button>
    </div>
  );
}

export default ClassworkItem;
