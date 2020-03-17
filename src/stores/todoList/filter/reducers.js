import { handleActions, combineActions } from 'redux-actions';

import { allTask, completeTask, incompleteTask } from './actions';

const defaultState = 'ALL';

const reducer = handleActions(
  {
    [combineActions(allTask, completeTask, incompleteTask)]: (
      state,
      { payload }
    ) => {
      return payload;
    }
  },
  defaultState
);

export default reducer;
