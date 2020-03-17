import { createAction } from 'redux-actions';

export const allTask = createAction('ALL_TASK');

export const completeTask = createAction('Complete_TASK');

export const incompleteTask = createAction('INCOMPLETE_TASK');
