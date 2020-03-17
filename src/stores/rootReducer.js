import { combineReducers } from 'redux';
import counter from './counter/reducers';
import todoList from './todoList/reducers';
import filter from './todoList/filter/reducers';

const rootReducers = combineReducers({ counter, todoList, filter });

export default rootReducers;
