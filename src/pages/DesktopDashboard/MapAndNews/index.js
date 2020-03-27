import React, { useState } from 'react';
import styled from 'styled-components';
import Map from 'components/Map';
import Header from 'pages/Home/components/Header';
import Summary from 'pages/Home/components/Summary';
import { Switch } from 'antd';

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
  padding-top: 8px;
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

const SwitchContainer = styled.div`
  ${({ theme }) => theme.typography.bodyLarge()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  display: flex;
  justify-content: space-between;
`;

const SwitchStyled = styled(Switch)`
  && {
    max-width: 28px;
    min-width: 28px;
    width: 100%;
    height: 16px;
    margin-left: 8px;
    ::after {
      width: 12px;
      height: 12px;
    }
  }
`;

const MapAndNews = () => {
  const [isFilterInChiangmai, setIsFilterInChiangmai] = useState(true);

  return (
    <div>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MapContainer>
        <Map />
      </MapContainer>
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
    </div>
  );
};

export default MapAndNews;
