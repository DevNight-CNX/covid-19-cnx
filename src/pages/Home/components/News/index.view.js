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
  flex-wrap: wrap;

  > button:not(:first-child) {
    margin-top: 15px;
  }

  @media screen and (min-width: 334px) {
    > button:not(:first-child) {
      margin-top: 0px;
    }
  }

  @media screen and (min-width: 350px) {
    > button:not(:first-child) {
      margin-left: 15px;
    }
  }
`;
const WrapperCards = styled.div`
  margin-top: 15px;
`;

export { Wrapper, ButtonsWrapper, WrapperCards };
