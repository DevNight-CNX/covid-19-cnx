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
import ImageUploader from './ImageUploader';
import PlaceAutocomplete from './PlaceAutocomplete';
import { Switch } from 'antd';

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
          <Input {...getInputProps()} placeholder="" />
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

export const AdaptImageUploader = makeAdaptField(ImageUploader);

export const AdaptPlaceAutoComplete = makeAdaptField(PlaceAutocomplete);

export const AdaptToggle = makeAdaptField(({ onChange }) => (
  <Switch defaultChecked={false} onChange={onChange} />
));
