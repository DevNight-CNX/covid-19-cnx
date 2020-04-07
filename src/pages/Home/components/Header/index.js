import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSummarys } from 'contexts/summarys.context';

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

const Header = () => {
  const { summary } = useSummarys();

  const time = summary
    ? moment(summary['เพิ่มวันที่'], 'DD/MM/YYYY')
        .startOf('day')
        .fromNow()
    : '';

  return (
    <>
      <Headline>รายงานสถานการณ์ โควิด-19 ณ จังหวัดเชียงใหม่</Headline>
      <LastUpdateStatus>{`อัพเดทข้อมูลล่าสุด ${time}`}</LastUpdateStatus>
      <Notice>
        ข้อมูลในเว็บไซต์จะถูกจำกัดในพื้นที่จังหวัดเชียงใหม่เท่านั้น
      </Notice>
    </>
  );
};

export default Header;
