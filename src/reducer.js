// reducer.js

export const initialState = {
  isLoggedIn: false,
  username: '',
  classworks: {},  
  error: '',
  isLoading: false,
  lastAddedId: '',
  filter: 'all',
};


export default function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, isLoggedIn: true, username: action.username, error: '' };

    case 'logout':
      return { ...initialState };

    case 'setClassworks':
      return { ...state, classworks: action.classworks, isLoading: false };

    case 'addClasswork':
      return {
        ...state,
        classworks: {
          ...state.classworks,
          [action.classwork.id]: action.classwork,
        },
        lastAddedId: action.classwork.id,
      };

    case 'deleteClasswork':
      const updated = { ...state.classworks };
      delete updated[action.id];
      return { ...state, classworks: updated };

    case 'updateClasswork':
      return {
        ...state,
        classworks: {
          ...state.classworks,
          [action.classwork.id]: action.classwork,
        },
      };

    case 'setError':
      return { ...state, error: action.error };

    case 'clearError':
      return { ...state, error: '' };

    case 'setLoading':
      return { ...state, isLoading: true };

    case 'setFilter':
      return {
        ...state,
        filter: action.filter,
      };

    default:
      return state;
  }
}
