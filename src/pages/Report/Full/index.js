import React from 'react';
import styled from 'styled-components';
import { GoBackHeader } from 'components/BarNavigation/navigation';
import Container from './Container';

const Wrapper = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 0px auto 36px;

  @media only screen and (max-width: 1100px) {
    margin-top: 56px;
  }
`;

const FullReport = () => {
  return (
    <>
      <GoBackHeader mxwidth="680px" link={'/'} />
      <Wrapper>
        <Container />
      </Wrapper>
    </>
  );
};

export default FullReport;
