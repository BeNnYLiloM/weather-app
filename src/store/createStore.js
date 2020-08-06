export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  const listeners = {};

  return {
    subscribe(fn, event) {
      listeners[event] = listeners[event] || [];
      listeners[event].push(fn);

      return {
        unsubscribe() {
          listeners[event] = listeners[event].filter(listener => listener !== fn);
        }
      };
    },
    dispatch(action, event = '') {
      state = rootReducer(state, action);

      if (event) {
        listeners[event].forEach(listener => listener(state));
      }
    },
    getState() {
      return state;
    }
  };
}
