import React from 'react';
import makeFieldDecorator from 'utils/form/makeFieldDecorator';
import {
  Wrapper,
  FieldInput,
  FieldSelect,
  FieldLabel,
  ErrorMessage,
  HelpMessage,
  Textarea
} from './index.view';

const makeAdaptField = Input =>
  makeFieldDecorator(
    ({
      getLabelProps,
      getErrorMessageProps,
      getHelpMessageProps,
      getInputProps
    }) => {
      return (
        <Wrapper>
          <FieldLabel {...getLabelProps()} />
          <Input {...getInputProps()} />
          <ErrorMessage {...getErrorMessageProps()} />
          <HelpMessage {...getHelpMessageProps()} />
        </Wrapper>
      );
    }
  );

export const AdaptField = makeAdaptField(FieldInput);

export const AdaptSelect = makeAdaptField(({ options, ...props }) => (
  <FieldSelect {...props}>
    <option value="">--Please choose an option--</option>
    {options.map(({ value, text }) => (
      <option value={value}>{text}</option>
    ))}
  </FieldSelect>
));

export const AdaptTextarea = makeAdaptField(Textarea);
