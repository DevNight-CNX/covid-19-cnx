import React from 'react';
import styled from 'styled-components';
import Paper from './components/Paper';
import MapAndNews from './MapAndNews';
import ReliableReport from './ReliableReport';
import Report from './Report/index';
import { useMediaQuery } from 'react-responsive';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.neutralColor.lightGray100};
  width: 100vw;
  min-height: 100vh;
  padding: 24px 48px 32px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  grid-template-areas:
    'map map'
    'all-report aside';
  margin: 0 auto;
  max-width: 1152px;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
`;

const DesktopDashboard = ({ match }) => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1100px)'
  });

  const IsFull = () => {
    if (isDesktop) {
      return true;
    } else if (match.path !== '/report/:id') {
      return true;
    }
    return false;
  };

  return (
    <Wrapper>
      <Container>
        <Paper grid="map">
          <MapAndNews />
        </Paper>
        <Paper grid="all-report" title="ข่าวทั้งหมด">
          <Report />
        </Paper>
        <Paper grid="aside" title="ข่าวน่าเชื่อถือจากชุมชน" noBg>
          <ReliableReport isFull={IsFull()} />
        </Paper>
      </Container>
    </Wrapper>
  );
};

export default withRouter(DesktopDashboard);
