import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Form, Field } from 'react-final-form';
import { omit } from 'ramda';
import makeFieldDecorator from '../index';

const renderForm = (onSubmit = () => {}) => {
  const Label = props => {
    const getColor = () => {
      const { isError, isFocus } = props;
      if (isError) {
        return 'red';
      } else if (isFocus) {
        return 'blue';
      } else {
        return 'black';
      }
    };

    const { children, optional, htmlFor } = props;

    return (
      <label
        htmlFor={htmlFor}
        style={{
          color: getColor()
        }}
      >
        {children} {optional ? '(Optional)' : ''}
      </label>
    );
  };

  const ErrorMessage = ({ isShow, children }) => {
    if (isShow) {
      return <p>{children}</p>;
    }
    return null;
  };

  const HelpMessage = ({ isShow, children }) => {
    if (isShow) {
      return <p>{children}</p>;
    }

    return null;
  };

  const Input = props => {
    const getBorderColor = () => {
      const { isError, isFocus } = props;
      if (isError) {
        return 'red';
      } else if (isFocus) {
        return 'blue';
      } else {
        return 'black';
      }
    };

    return (
      <input
        {...omit(['isError', 'isFocus'], props)}
        style={{
          border: '1px solid black',
          borderColor: getBorderColor()
        }}
      />
    );
  };

  const makeAdaptField = () =>
    makeFieldDecorator(
      ({
        getLabelProps,
        getErrorMessageProps,
        getHelpMessageProps,
        getInputProps,
        title
      }) => {
        return (
          <div>
            <p>{title}</p>
            <Label {...getLabelProps()} />
            <Input {...getInputProps()} />
            <ErrorMessage {...getErrorMessageProps()} />
            <HelpMessage {...getHelpMessageProps()} />
          </div>
        );
      }
    );

  const FieldInput = makeAdaptField();

  const testUtils = render(
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              title="Name Title"
              component={FieldInput}
              name="name"
              label="name"
              placeholder="username"
              helpMessage="username is for identify you from other users"
              validate={value =>
                !value ? 'this field is required' : undefined
              }
            />
            <Field
              title="Age Title"
              component={FieldInput}
              type="number"
              name="age"
              label="age"
              placeholder="your age"
              optional
            />
            <button type="submit">Submit</button>
          </form>
        );
      }}
    />
  );

  const { getByText } = testUtils;

  return {
    ...testUtils,
    getSubmitButton: () => getByText('Submit')
  };
};

describe('makeFieldDecorator', () => {
  test(`should render correctly when it's initial state`, () => {
    const {
      getByText,
      getByLabelText,
      getByPlaceholderText,
      queryByText
    } = renderForm();

    expect(getByLabelText('name')).toBeInTheDocument();
    expect(getByPlaceholderText('username')).toBeInTheDocument();
    expect(getByLabelText('name').type).toBe('text');
    expect(
      getByText('username is for identify you from other users')
    ).toBeInTheDocument();
    expect(queryByText('this field is required')).not.toBeInTheDocument();

    expect(getByLabelText('age (Optional)')).toBeInTheDocument();
    expect(getByPlaceholderText('your age')).toBeInTheDocument();
    expect(getByPlaceholderText('your age').type).toBe('number');
  });

  test(`should show error correctly when field has visited`, () => {
    const { getByLabelText, queryByText, getByText } = renderForm();

    fireEvent.focus(getByLabelText('name'));

    expect(queryByText('this field is required')).not.toBeInTheDocument();
    expect(
      queryByText('username is for identify you from other users')
    ).toBeInTheDocument();

    fireEvent.blur(getByLabelText('name'));

    expect(queryByText('this field is required')).toBeInTheDocument();
    expect(
      queryByText('username is for identify you from other users')
    ).not.toBeInTheDocument();

    expect(getByText('name').style.color).toBe('red');
    expect(getByLabelText('name').style.borderColor).toBe('red');

    fireEvent.focus(getByLabelText('age (Optional)'));
    fireEvent.blur(getByLabelText('age (Optional)'));

    expect(getByText('age (Optional)').style.color).toBe('black');
    expect(getByLabelText('age (Optional)').style.borderColor).toBe('black');
  });

  test(`should show error correctly when submit button is clicked`, () => {
    const {
      queryByText,
      getByText,
      getByLabelText,
      getSubmitButton
    } = renderForm();

    fireEvent.click(getSubmitButton());

    expect(queryByText('this field is required')).toBeInTheDocument();
    expect(
      queryByText('username is for identify you from other users')
    ).not.toBeInTheDocument();

    expect(getByText('name').style.color).toBe('red');
    expect(getByLabelText('name').style.borderColor).toBe('red');

    expect(getByText('age (Optional)').style.color).toBe('black');
    expect(getByLabelText('age (Optional)').style.borderColor).toBe('black');
  });

  test('should pass value to final form correctly', () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText, getSubmitButton } = renderForm(onSubmitMock);

    fireEvent.change(getByLabelText('name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('age (Optional)'), {
      target: { value: 26 }
    });

    fireEvent.click(getSubmitButton());

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock.mock.calls[0][0]).toEqual({
      name: 'John',
      age: '26'
    });
  });

  test('label has htmlFor correctly with input', () => {
    const { getByLabelText, getByText } = renderForm();

    expect(getByLabelText('name').id).toBe('field-name');
    expect(getByText('name').htmlFor).toBe('field-name');

    expect(getByLabelText('age (Optional)').id).toBe('field-age');
    expect(getByText('age (Optional)').htmlFor).toBe('field-age');
  });

  test('should render correctly when input is focus', () => {
    const { getByLabelText, getByText } = renderForm();

    fireEvent.focus(getByLabelText('name'));

    expect(getByText('name').style.color).toBe('blue');
    expect(getByLabelText('name').style.borderColor).toBe('blue');

    fireEvent.blur(getByLabelText('name'));

    expect(getByText('name').style.color).toBe('red');
    expect(getByLabelText('name').style.borderColor).toBe('red');

    fireEvent.focus(getByLabelText('age (Optional)'));

    expect(getByText('age (Optional)').style.color).toBe('blue');
    expect(getByLabelText('age (Optional)').style.borderColor).toBe('blue');

    fireEvent.blur(getByLabelText('age (Optional)'));

    expect(getByText('age (Optional)').style.color).toBe('black');
    expect(getByLabelText('age (Optional)').style.borderColor).toBe('black');
  });

  test('provied props excluding Field props should be passed through', () => {
    const { getByText } = renderForm();

    expect(getByText('Name Title')).toBeInTheDocument();
    expect(getByText('Age Title')).toBeInTheDocument();
  });
});
