// Controls.jsx
import '../css/Controls.css';
function Controls({ onLogout, onRefresh }) {
    return (
      <div className="controls">
        <button className="controls__logout" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    );
  }
  
  export default Controls;
  