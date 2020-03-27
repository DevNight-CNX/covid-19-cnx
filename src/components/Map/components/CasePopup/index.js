import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import getSafeLink from 'utils/getSafeLink';
import pinIcon from './assets/pin.svg';

const Wrapper = styled.div`
  max-width: 300px;
  min-width: 250px;
  color: #000000;
  padding: 8px 8px;
`;

const Date = styled.p`
  color: #8995a0;
  font-family: Kanit, Arial, sans-serif;
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
`;

const getStatusColor = type => {
  switch (type) {
    case 'หาย':
      return '#34C759';
    case 'รักษา':
      return '#FFD600';
    case 'เสียชีวิต':
      return '#FF3B30';
    default:
      return '#000000';
  }
};

const StatusColor = styled.span`
  color: ${({ type }) => {
    return getStatusColor(type);
  }};
`;

const Dash = styled.p`
  margin-bottom: 4px;
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
`;

const Title = styled.p`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  margin-bottom: 4px;
`;

const Status = styled.p`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 4px;
  color: #202124;
`;

const AddressWrapper = styled.div`
  padding-left: 20px;
  background-image: url(${pinIcon});
  background-position: 0 50%;
  background-repeat: no-repeat;
`;

const Address = styled.p`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #636f7a;
`;

const Link = styled.a`
  font-family: Kanit, Arial, sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #007aff;
  margin-right: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const Detail = styled.pre`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  white-space: pre-wrap;
`;

const Unknown = styled.span`
  font-style: italic;
  color: #8995a0;
`;

const CasePopupPropTypes = {
  data: PropTypes.object
};

const CasePopup = ({ data = {} }) => {
  const getTime = () => {
    const time = data.date;
    return moment(time).fromNow() === 'Invalid date'
      ? null
      : moment(time).fromNow();
  };

  const showUnknownWhenEmpty = data => {
    return Number(data) === -1 ? <Unknown>ไม่ทราบ</Unknown> : data;
  };

  return (
    <Wrapper>
      {data.address && <Title>{data.address}</Title>}
      <Status>ผู้ติดเชื้อสะสม {showUnknownWhenEmpty(data.infected)}</Status>
      <Status>รักษาตัวในรw. {showUnknownWhenEmpty(data.treated)}</Status>
      <Status>กลับบ้าน {showUnknownWhenEmpty(data.healed)}</Status>
      <Status>เสียชีวิต {showUnknownWhenEmpty(data.died)}</Status>
      {data.description && <Detail>{data.description}</Detail>}
      {getTime() ? <Date>{getTime()}</Date> : null}
      <AddressWrapper>
        <Address>{data.address}</Address>
      </AddressWrapper>
      <Link href={getSafeLink(data.link)} target="_blank">
        ลิงก์ข่าว
      </Link>
    </Wrapper>
  );
};

CasePopup.propTypes = CasePopupPropTypes;

export default CasePopup;
