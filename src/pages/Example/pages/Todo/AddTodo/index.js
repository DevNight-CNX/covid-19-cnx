import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from 'stores/todoList/actions';
import AddTodo from './index.view';

const AddTodoContainerPropTypes = {
  addTodo: PropTypes.func
};

class AddTodoContainer extends Component {
  state = { value: '' };

  setValue = value => {
    this.setState({ value });
  };

  submitValue = () => {
    const { value } = this.state;
    const { addTodo } = this.props;
    addTodo(value);
    this.setState({
      value: ''
    });
  };

  render() {
    const { value } = this.state;
    return (
      <AddTodo
        submitTodo={this.submitValue}
        setValue={this.setValue}
        value={value}
      />
    );
  }
}

AddTodoContainer.propTypes = AddTodoContainerPropTypes;

const mapDispatchToProps = {
  addTodo
};

export default connect(
  null,
  mapDispatchToProps
)(AddTodoContainer);
