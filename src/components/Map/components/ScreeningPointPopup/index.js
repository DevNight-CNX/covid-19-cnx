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
  margin: 0;
  margin-top: 8px;
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

  return (
    <Wrapper>
      {getTime() ? <Date>{getTime()}</Date> : null}
      <Status>จุดคัดกรองที่ {data.order}</Status>
      {data.detail && <Detail>{data.detail}</Detail>}
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
