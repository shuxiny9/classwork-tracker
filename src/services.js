export function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
      credentials: 'include',
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
      credentials: 'include',
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchClassworks() {
    return fetch('/api/classworks', {
      method: 'GET',
      credentials: 'include',
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchAddClasswork(title, dueDate) {
    return fetch('/api/classworks', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ title, dueDate }),
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchUpdateClasswork(id, update) {
    return fetch(`/api/classworks/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(update),
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchDeleteClasswork(id) {
    return fetch(`/api/classworks/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch(error => Promise.reject({ error }))
      .then(err => Promise.reject(err));
  }
  