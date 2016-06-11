export default function createReducer(initialState, map) {
  return function reducer(state = initialState, action) {
    if (map.hasOwnProperty(action.type)) {
      return map[action.type](state, action);
    } else {
      return state;
    }
  };
}
