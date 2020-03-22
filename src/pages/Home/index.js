import React from 'react';

import Map from 'components/Map';
import Summary from './components/Summary';
import Buttons from 'components/Button';
import { ReactComponent as AddNewsIcon } from './assets/AddNews.svg';
import FakeNewsReport from 'pages/Report/FakeNews';
import NewsCarousel from 'pages/components/newsCarousel';

import {
  Wrapper,
  MapContainer,
  Header,
  Headline,
  LastUpdateStatus,
  Notice,
  NewsContainer,
  NewsCredibilityContainer,
  NewsCredibility,
  ButtonsWrapper
} from './index.view';

const Home = () => {
  return (
    <Wrapper>
      <Header>
        <Headline>รายงานสถานการณ์ โควิด-19 ณ จังหวัดเชียงใหม่</Headline>
        <LastUpdateStatus>อัพเดทข้อมูลล่าสุด 6 ชม ที่แล้ว</LastUpdateStatus>
        <Notice>
          ข้อมูลในเว็บไซต์จะถูกจำกัดในพื้นที่จังหวัดเชียงใหม่เท่านั้น
        </Notice>
      </Header>
      <MapContainer>
        <Map />
      </MapContainer>
      <NewsContainer>
        <NewsCarousel />
      </NewsContainer>
      <Summary />
      <NewsCredibilityContainer>
        <NewsCredibility>แหล่งข่าวน่าเชื่อถือ</NewsCredibility>
        <div style={{ height: 443 }} />
        <ButtonsWrapper>
          <Buttons outline={'true'} style={{ marginRight: 5 }}>
            ข่าวทั้งหมด
          </Buttons>
          <Buttons icon={<AddNewsIcon />} style={{ marginLeft: 5 }}>
            รายงานข่าว
          </Buttons>
        </ButtonsWrapper>
      </NewsCredibilityContainer>
      <FakeNewsReport />
    </Wrapper>
  );
};

export default Home;
