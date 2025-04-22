import '../css/FilterControls.css';

function FilterControls({ currentFilter, onSetFilter }) {
    const filters = [
      { label: '📋 All', value: 'all' },
      { label: '🙅 Undone', value: 'undone' },
      { label: '✅ Done', value: 'done' },
    ];
  
    return (
      <div className="filter-controls">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            className={`filter-button ${value === currentFilter ? 'filter-button--selected' : ''}`}
            onClick={() => onSetFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }
  
  export default FilterControls;
  