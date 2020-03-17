import styled from 'styled-components';

export const FieldLabel = styled.label`
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
  background-color: ${({ theme }) => theme.color.white};
  background-clip: padding-box;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.black};
  display: block;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  width: 100%;
  border-color: ${({ isError, theme }) =>
    isError ? theme.color.error : theme.color.black};
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

export const Textarea = styled.textarea`
  display: block;
`;
