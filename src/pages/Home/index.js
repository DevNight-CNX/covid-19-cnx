import React, { Suspense, useState } from 'react';
import Map from 'components/Map';
import Summary from './components/Summary';
import FakeNewsReport from 'pages/Report/FakeNews';
import NewsCarousel from 'pages/components/newsCarousel';
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
  SwitchStyled
} from './index.view';
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
          <SummaryWrapper>
            <Summary isFilterInChiangmai={isFilterInChiangmai} />
          </SummaryWrapper>
        </InfoSummaryWrapper>
        <NewsContainer>
          <NewsCarousel />
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
