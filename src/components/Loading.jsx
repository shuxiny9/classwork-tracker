// Loading.jsx
import '../css/Loading.css';
function Loading({ className = '', children }) {
    return (
      <div className={`loading ${className}`}>
        {children || 'Loading...'}
      </div>
    );
  }
  
  export default Loading;
  