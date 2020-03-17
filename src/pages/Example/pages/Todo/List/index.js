import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo, checkedTodo } from 'stores/todoList/actions';
import { getTodoList } from 'stores/todoList/selectors';
import List from './index.view';

const ListContainerPropTypes = {
  items: PropTypes.array,
  addTodo: PropTypes.func,
  checkedTodo: PropTypes.func
};

const ListContainer = ({ items, checkedTodo }) => {
  return <List items={items} checkedTodo={checkedTodo} />;
};

ListContainer.propTypes = ListContainerPropTypes;

const mapStateToProps = state => ({
  items: getTodoList(state)
});

const mapDispatchToProps = {
  addTodo,
  checkedTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
