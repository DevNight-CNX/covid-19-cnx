import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increment, decrement } from 'stores/counter/actions';
import { getCounter } from 'stores/counter/selectors';
import List from './index.view';

const ListContainerPropTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func,
  decrement: PropTypes.func
};

const ListContainer = ({ counter, increment, decrement }) => {
  const items = [...Array(counter).keys()].map((_, index) => `Item ${index}`);
  return (
    <List
      items={items}
      onIncrementClick={increment}
      onDecrementClick={decrement}
    />
  );
};

ListContainer.propTypes = ListContainerPropTypes;

const mapStateToProps = state => ({
  counter: getCounter(state)
});

const mapDispatchToProps = {
  increment,
  decrement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
