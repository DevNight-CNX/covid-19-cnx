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
import { Switch, Radio } from 'antd';
import styled from 'styled-components';

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
  <Switch defaultChecked={false} onChange={onChange} size="small" />
));

const RadioWrapper = styled.div`
  display: flex;
`;

const RadioContainer = styled.div`
  width: 100%;
  .ant-radio-button-wrapper {
    flex-grow: 1;
    text-align: center;
    ${({ theme }) => theme.typography.content()}
    line-height: 32px;
  }
  .ant-radio-group {
    display: flex;
    width: 100%;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled),
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    color: ${({ theme }) => theme.color.primaryColor.blueRibbon};
    border-color: ${({ theme }) => theme.color.primaryColor.blueRibbon};
  }

  .ant-radio-button-wrapper:hover {
    color: ${({ theme }) => theme.color.primaryColor.blueRibbon};
  }
`;

const PreviewImage = styled.img`
  width: 90px;
  height: 90px;
  flex: 0 0 auto;
  margin-left: 16px;
`;

const EmptyPreview = styled.div`
  width: 90px;
  height: 90px;
  display: inline-block;
  flex: 0 0 auto;
  margin-left: 16px;
`;

export const AdaptRadio = makeFieldDecorator(
  ({
    getLabelProps,
    getErrorMessageProps,
    getHelpMessageProps,
    getInputProps,
    items = []
  }) => {
    const selectedItem = items.find(item => {
      return item.value === getInputProps().value;
    });

    return (
      <RadioWrapper>
        <RadioContainer>
          <FieldLabel {...getLabelProps()} />
          <div>
            <Radio.Group {...getInputProps()}>
              {items.map(item => {
                return (
                  <Radio.Button key={item.value} value={item.value}>
                    {item.label}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
          <ErrorMessage {...getErrorMessageProps()} />
          <HelpMessage {...getHelpMessageProps()} />
        </RadioContainer>
        {selectedItem ? (
          <PreviewImage src={selectedItem.preview} />
        ) : (
          <EmptyPreview />
        )}
      </RadioWrapper>
    );
  }
);
