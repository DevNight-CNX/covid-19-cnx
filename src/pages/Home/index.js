import React from 'react';
import Map from 'components/Map';
import Summary from './components/Summary';
import News from './components/News';
import FakeNewsReport from 'pages/Report/FakeNews';
import NewsCarousel from 'pages/components/newsCarousel';

import {
  Wrapper,
  Container,
  MapContainer,
  Header,
  Headline,
  LastUpdateStatus,
  Notice,
  NewsContainer
} from './index.view';

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Headline>รายงานสถานการณ์ โควิด-19 ณ จังหวัดเชียงใหม่</Headline>
          <LastUpdateStatus>อัพเดทข้อมูลล่าสุด 6 ชม ที่แล้ว</LastUpdateStatus>
          <Notice>
            ข้อมูลในเว็บไซต์จะถูกจำกัดในพื้นที่จังหวัดเชียงใหม่เท่านั้น
          </Notice>
        </Header>
      </Container>
      <MapContainer>
        <Map />
      </MapContainer>
      <Container>
        <NewsContainer>
          <NewsCarousel />
        </NewsContainer>
        <Summary />
        <News />
        <FakeNewsReport />
      </Container>
    </Wrapper>
  );
};

export default Home;
