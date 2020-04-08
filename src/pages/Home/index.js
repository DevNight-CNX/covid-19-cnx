import React, { Suspense, useState } from 'react';
import Map from 'components/Map';
import Summary from './components/Summary';
import FakeNewsReport from 'pages/Report/FakeNews';
import NewsList from 'pages/components/newsList';
import Header from './components/Header';
import {
  Wrapper,
  Container,
  MapContainer,
  HeaderWrapper,
  NewsContainer,
  SummaryWrapper,
  FakeNewsReportWrapper,
  InfoSummaryWrapper,
  InfoSummary,
  SwitchContainer,
  SwitchStyled,
  GraphSummary
} from './index.view';
import Graph from './components/Summary/graph';
const LazyNews = React.lazy(() => import('./components/News'));

const Home = () => {
  const [isFilterInChiangmai, setIsFilterInChiangmai] = useState(true);

  return (
    <Wrapper>
      <Container>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
      </Container>
      <MapContainer>
        <Map />
      </MapContainer>
      <Container>
        <InfoSummaryWrapper>
          <SwitchContainer>
            <InfoSummary>รายงานข้อมูลผู้ป่วยใน</InfoSummary>
            <p>
              {isFilterInChiangmai ? 'เชียงใหม่' : 'ประเทศไทย'}
              <SwitchStyled
                defaultChecked={isFilterInChiangmai}
                onChange={e => setIsFilterInChiangmai(e)}
              />
            </p>
          </SwitchContainer>
          <GraphSummary>
            <Graph isFilterInChiangmai={isFilterInChiangmai} />
          </GraphSummary>
          <SummaryWrapper>
            <Summary isFilterInChiangmai={isFilterInChiangmai} />
          </SummaryWrapper>
        </InfoSummaryWrapper>
        <NewsContainer>
          <NewsList />
        </NewsContainer>
        <Suspense fallback={<div />}>
          <LazyNews />
        </Suspense>
        <FakeNewsReportWrapper>
          <FakeNewsReport />
        </FakeNewsReportWrapper>
      </Container>
    </Wrapper>
  );
};

export default Home;
