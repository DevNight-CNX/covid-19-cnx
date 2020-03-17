export const getTodoList = state => {
  if (state.filter === 'COMPLETE') {
    return state.todoList
      .filter(res => res.isChecked === true)
      .map(list => list);
  } else if (state.filter === 'INCOMPLETE') {
    return state.todoList
      .filter(res => res.isChecked === false)
      .map(list => list);
  } else {
    return state.todoList;
  }
};
