import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import Downshift from 'downshift';

export const FieldLabel = styled.label`
  ${({ theme }) => theme.typography.content()}
  width: 100%;
  display: inline-block;
  margin-bottom: 8px;
  color: ${({ isError, theme }) =>
    isError ? theme.color.error : theme.color.black};

  ${({ optional }) =>
    optional
      ? `
    &:after {
      content: "(Optional)";
      display: inline-block;
      margin-left: 4px;
    }
  `
      : ''}
`;

export const FieldInput = styled.input`
  ${({ theme }) => theme.typography.content()}
  background-color: ${({ theme }) => theme.color.white};
  background-clip: padding-box;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.field.lightGray};
  border-radius: 2px;
  color: ${({ theme }) => theme.color.black};
  display: block;
  height: calc(1.5em + 0.75rem + 11px);
  padding: 0.375rem 0.75rem;
  max-width: 634px;
  min-width: 312px;
  width: 100%;
  border-color: ${({ isError, theme }) =>
    isError ? theme.color.error : theme.color.field.lightGray};

  :focus {
    border-color: ${({ theme }) => theme.color.black};
    outline: none;
  }

`;

export const FieldSelect = styled.select`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  background-clip: padding-box;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  ${({ isError, theme }) =>
    isError
      ? `
        border-color: ${theme.color.error};
        color: ${theme.color.error};
      `
      : ''}
`;

export const Wrapper = styled.div`
  ${({ theme }) => theme.typography.field()}
  margin: 15px 0;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.color.error};
  ${({ isShow }) => (!isShow ? `display: none;` : '')}
  margin: 8px 0 0;
`;

export const HelpMessage = styled.p`
  color: ${({ theme }) => theme.color.lightBlue};
  ${({ isShow }) => (!isShow ? `display: none;` : '')}
  margin: 8px 0 0;
`;

export const Textareasdsdf = styled.textarea`
  ${({ theme }) => theme.typography.content()}
  display: block;
  max-width: 634px;
  min-width: 312px;
  width: 100%;
  height: calc(1.5em + 0.75rem + 45px);
  border: 1px solid ${({ theme }) => theme.color.field.lightGray};
  border-radius: 2px;

  :focus {
    border-color: ${({ theme }) => theme.color.black};
    outline: none;
  }
`;

export const Textarea = styled(TextareaAutosize)`
  ${({ theme }) => theme.typography.content()};
  color: ${({ theme }) => theme.color.black};
  display: block;
  max-width: 634px;
  min-width: 312px;
  width: 100%;
  min-height: calc(1.5em + 0.75rem + 45px);
  height: auto;
  border: 1px solid ${({ theme }) => theme.color.field.lightGray};
  padding: 0.375rem 0.75rem;
  border-radius: 2px;

  :focus {
    border-color: ${({ theme }) => theme.color.black};
    outline: none;
  }
`;

const AutoCompletePropTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func
};

export const AutoComplete = ({ items, onChange, onInputChange }) => {
  return (
    <Downshift
      onChange={selection => {
        onChange(selection);
      }}
      onInputValueChange={inputValue => {
        onInputChange(inputValue);
      }}
      itemToString={item => (item ? item.name : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <AutoComplete.Wrapper>
            <FieldInput {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen
                ? items.map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : null,
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }
                      })}
                    >
                      {item.name}
                    </li>
                  ))
                : null}
            </ul>
          </AutoComplete.Wrapper>
        </div>
      )}
    </Downshift>
  );
};

AutoComplete.propTypes = AutoCompletePropTypes;

AutoComplete.Wrapper = styled.div``;
