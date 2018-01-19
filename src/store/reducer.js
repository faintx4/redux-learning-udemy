import * as actionsTypes from './actuions';

const initialState = {
  counter: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.INC_COUNTER:
      return {
        ...state,
        counter: state.counter + 1
      };
    case actionsTypes.ADD_COUNTER:
      return {
        ...state,
        counter: state.counter + action.value
      };
    case actionsTypes.STORE_RESULT:
      return {
        ...state,
        // results: [...state.results, state.counter]
        results: state.results.concat({id: Date.now(), value:state.counter})
      };
    case actionsTypes.DELETE_RESULT:
      const newResults = state.results
        .filter(result => {
          return result.id !== action.id
      });
      return {
        ...state,
        results: newResults
      };
    default:
      return state;
  }
};

export default reducer;