import React from 'react';
import styled from 'styled-components';
import Map from 'components/Map';
import Summary from './components/Summary';
import Buttons from 'components/Button';
import { ReactComponent as AddNewsIcon } from './assets/AddNews.svg';
import FakeNewsReport from 'pages/Report/FakeNews';
import NewsCarousel from 'pages/components/newsCarousel';

const Wrapper = styled.div``;

const MapContainer = styled.div`
  width: 100%;
  height: 344px;
`;

const Header = styled.header`
  padding: 62px 24px 16px;
`;

const Headline = styled.h1`
  ${({ theme }) => theme.typography.subtitle()}
  color: ${({ theme }) => theme.color.dark};
  margin-bottom: 8px;
`;

const LastUpdateStatus = styled.p`
  ${({ theme }) => theme.typography.body()}
  color: ${({ theme }) => theme.color.dark};
  margin-bottom: 8px;
`;

const Notice = styled.p`
  ${({ theme }) => theme.typography.body()}
  color: ${({ theme }) => theme.color.logicColor.warning};
  margin: 0;
`;

const NewsContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 24px;
`;

const NewsCredibilityContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 16px 24px 8px;
`;

const NewsCredibility = styled.p`
  ${({ theme }) => theme.typography.body()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  margin: 0;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2px;
`;

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
