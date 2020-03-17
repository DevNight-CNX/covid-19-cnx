import { handleActions, combineActions } from 'redux-actions';
import { increment, decrement } from './actions';

const defaultState = 10;

const reducer = handleActions(
  {
    [combineActions(increment, decrement)]: (state, { payload }) => {
      const result = state + payload.amount;
      return result >= 0 ? result : 0;
    }
  },
  defaultState
);

export default reducer;
