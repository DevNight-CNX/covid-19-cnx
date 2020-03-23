import React, { Suspense } from 'react';
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
  InfoSummary
} from './index.view';
const LazyNews = React.lazy(() => import('./components/News'));

const Home = () => {
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
        <NewsContainer>
          <NewsCarousel />
        </NewsContainer>
        <InfoSummaryWrapper>
          <InfoSummary>ข้อมูลผู้ป่วยอยู่ในประเทศไทย</InfoSummary>
          <SummaryWrapper>
            <Summary />
          </SummaryWrapper>
        </InfoSummaryWrapper>
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
