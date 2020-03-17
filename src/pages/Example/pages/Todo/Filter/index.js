import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  allTask,
  completeTask,
  incompleteTask
} from 'stores/todoList/filter/actions';
import Filter from './index.view';

const FilterContainerPropTypes = {
  alltask: PropTypes.func,
  completetask: PropTypes.func,
  incompletetask: PropTypes.func
};

const FilterContainer = ({ alltask, completetask, incompletetask }) => {
  return (
    <Filter
      allTask={alltask}
      completeTask={completetask}
      incompleteTask={incompletetask}
    />
  );
};

FilterContainer.propTypes = FilterContainerPropTypes;

const mapDispatchToProps = {
  alltask: allTask,
  completetask: completeTask,
  incompletetask: incompleteTask
};

export default connect(
  null,
  mapDispatchToProps
)(FilterContainer);
