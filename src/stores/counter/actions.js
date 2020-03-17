import { createActions } from 'redux-actions';

export const { increment, decrement } = createActions({
  INCREMENT: () => ({ amount: 1 }),
  DECREMENT: () => ({ amount: -1 })
});
