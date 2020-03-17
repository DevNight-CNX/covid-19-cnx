import { handleActions } from 'redux-actions';
import { addTodo, checkedTodo } from './actions';
const defaultState = [];

const reducer = handleActions(
  {
    [addTodo]: (state, { payload }) => {
      return [...state, { key: state.length, text: payload, isChecked: false }];
    },
    [checkedTodo]: (state, { payload }) => {
      const newState = [...state];
      newState[payload].isChecked = !state[payload].isChecked;
      return newState;
    }
  },
  defaultState
);

export default reducer;
