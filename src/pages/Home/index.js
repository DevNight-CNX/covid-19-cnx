import React from 'react';
import styled from 'styled-components';
import Map from 'components/Map';
import Summary from './components/Summary';

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
      <Summary />
    </Wrapper>
  );
};

export default Home;
