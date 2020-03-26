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
  const [isShow, setIshow] = useState(false);

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
          <SwitchContainer>
            <InfoSummary>รายงานข้อมูลผู้ป่วยใน</InfoSummary>
            <p>
              {isShow ? 'เชียงใหม่' : 'ประเทศไทย'}
              <SwitchStyled
                defaultChecked={isShow}
                onChange={e => setIshow(e)}
              />
            </p>
          </SwitchContainer>
          <SummaryWrapper>
            <Summary isShow={isShow} />
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
