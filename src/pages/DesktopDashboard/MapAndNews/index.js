import React from 'react';
import styled from 'styled-components';
import Map from 'components/Map';
import NewsCarousel from 'pages/components/newsCarousel';
import Header from 'pages/Home/components/Header';
import Summary from 'pages/Home/components/Summary';

const HeaderWrapper = styled.header`
  padding: 24px 16px 16px;
`;

const MapContainer = styled.div`
  height: 450px;
  position: relative;
`;

const NewsContainer = styled.div`
  position: relative;
  margin-top: 24px;
`;

const SummaryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 18px;
  padding-top: 24px;
`;

const InfoSummaryWrapper = styled.div`
  display: grid;
  padding: 24px 16px;
`;

const InfoSummary = styled.p`
  ${({ theme }) => theme.typography.body()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  margin: 0;
`;

const MapAndNews = () => {
  return (
    <div>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MapContainer>
        <Map />
      </MapContainer>
      <NewsContainer>
        <NewsCarousel />
      </NewsContainer>
      <InfoSummaryWrapper>
        <InfoSummary>ข้อมูลผู้ป่วยอยู่ในประเทศไทย</InfoSummary>
        <SummaryWrapper>
          <Summary />
        </SummaryWrapper>
      </InfoSummaryWrapper>
    </div>
  );
};

export default MapAndNews;
