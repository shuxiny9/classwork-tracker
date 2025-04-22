// Classworks.jsx
import Loading from './Loading';
import '../css/Classworks.css';
import ClassworkItem from './ClassworkItem';

function Classworks({ classworks, isLoading, lastAddedId, onToggle, onDelete , filter, onEdit}) {
  const hasData = Object.keys(classworks).length > 0;

  if (isLoading) {
    return <Loading className="classworks__loading">Loading...</Loading>;
  }

  if (!hasData) {
    return <p>No Work Yet, Please Add</p>;
  }

  const filteredClassworks = Object.values(classworks).filter(classwork => {
    if (filter === 'done') return classwork.done;
    if (filter === 'undone') return !classwork.done;
    return true; // all
  });
  
  const sortedClassworks = filteredClassworks.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
  
    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;
  
    return dateA - dateB;
  });
  
  

  return (
    <ul className="classworks">
      {sortedClassworks.map(classwork => (
        <li key={classwork.id} className="classwork">
          <ClassworkItem
            classwork={classwork}
            isLastAdded={classwork.id === lastAddedId}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  );
}

export default Classworks;
