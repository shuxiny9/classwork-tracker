// App.jsx
import { useReducer, useEffect } from 'react';

import {
  fetchLogin, fetchLogout, fetchSession,
  fetchClassworks, fetchAddClasswork,
  fetchUpdateClasswork, fetchDeleteClasswork
} from './services';

import reducer, { initialState } from './reducer';
import { SERVER, CLIENT } from './constants';

import LoginForm from './components/LoginForm';
import Classworks from './components/Classworks';
import AddClassworkForm from './components/AddClassworkForm';
import Controls from './components/Controls';
import Status from './components/Status';
import Loading from './components/Loading';
import FilterControls from './components/FilterControls';


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin(username) {
    dispatch({ type: 'setLoading' });
    fetchLogin(username)
      .then(classworks => {
        dispatch({ type: 'login', username });
        dispatch({ type: 'setClassworks', classworks });
      })
      .catch(err => {
        dispatch({ type: 'setError', error: err?.error || 'ERROR' });
      });
  }

  function onLogout() {
    dispatch({ type: 'logout' });
    fetchLogout().catch(() => { });
  }

  function onAddClasswork(title, dueDate) {
    fetchAddClasswork(title, dueDate)
      .then(classwork => {
        dispatch({ type: 'addClasswork', classwork });
      })
      .catch(err => {
        dispatch({ type: 'setError', error: err?.error || 'ERROR' });
      });
  }

  function onDeleteClasswork(id) {
    dispatch({ type: 'setLoading' });
    fetchDeleteClasswork(id)
      .then(() => fetchClassworks())
      .then(classworks => {
        dispatch({ type: 'setClassworks', classworks });
      })
      .catch(err => {
        dispatch({ type: 'setError', error: err?.error || 'ERROR' });
      });
  }

  function onToggleClasswork(id) {
    const classwork = state.classworks[id];
    fetchUpdateClasswork(id, { done: !classwork.done })
      .then(updated => {
        dispatch({ type: 'updateClasswork', classwork: updated });
      })
      .catch(err => {
        dispatch({ type: 'setError', error: err?.error || 'ERROR' });
      });
  }

  function onEditClasswork(id, update) {
    fetchUpdateClasswork(id, update)
      .then(updated => {
        dispatch({ type: 'updateClasswork', classwork: updated });
      })
      .catch(err => {
        dispatch({ type: 'setError', error: err?.error || 'ERROR' });
      });
  }

  function onSetFilter(filter) {
    dispatch({ type: 'setFilter', filter });
  }
  

  function checkSession() {
    fetchSession()
      .then(session => {
        dispatch({ type: 'login', username: session.username });
        return fetchClassworks();
      })
      .then(classworks => {
        dispatch({ type: 'setClassworks', classworks });
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: 'logout' });
        } else {
          dispatch({ type: 'setError', error: err?.error || 'ERROR' });
        }
      });
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="app">
      <main className="main">
        {state.error && <Status error={state.error} />}
        {!state.isLoggedIn && <LoginForm onLogin={onLogin} />}
        {state.isLoggedIn && (
          <div className="content">
            <p>Hello, {state.username}</p>
            <Controls onLogout={onLogout} onRefresh={checkSession} />
            <FilterControls currentFilter={state.filter} onSetFilter={onSetFilter} />
            <Classworks
              classworks={state.classworks}
              isLoading={state.isLoading}
              lastAddedId={state.lastAddedId}
              onDelete={onDeleteClasswork}
              onToggle={onToggleClasswork}
              onEdit={onEditClasswork}  
              filter={state.filter}
            />
            <AddClassworkForm onAdd={onAddClasswork} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
