import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
  box-shadow: inset 0px -1px 0px #f0f0f0;

  @media only screen and (max-width: 1100px) {
    position: fixed;
    z-index: 10;
    top: 0px;
    width: 100%;
  }
`;

const Container = styled.div`
  ${({ theme: { font } }) => font.mainFont()};
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${({ mxwidth }) => mxwidth};
  padding: 19px 24px;
`;

const Title = styled.div`
  align-items: center;
  display: flex;
  color: #000;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  > *:first-child {
    margin-right: 15px;
  }
`;
const BackLink = styled.button`
  align-items: center;
  border: 0;
  color: ${({ theme: { color } }) => color.primaryColor.blue};
  cursor: pointer;
  display: flex;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  padding: 0;
  background: transparent;
  > span {
    padding-left: 18px;
  }
`;

export { Wrapper, Container, Title, BackLink };
