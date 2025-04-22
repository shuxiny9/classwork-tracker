// Status.jsx
import '../css/Status.css';
import { MESSAGES } from '../constants';

function Status({ error }) {
  return (
    <div className="status">
      {MESSAGES[error] || MESSAGES.default}
    </div>
  );
}

export default Status;
