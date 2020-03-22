import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  > button:not(:first-child) {
    margin-left: 15px;
  }
`;
const WrapperCards = styled.div`
  margin-top: 15px;
`;
export { Wrapper, ButtonsWrapper, WrapperCards };
