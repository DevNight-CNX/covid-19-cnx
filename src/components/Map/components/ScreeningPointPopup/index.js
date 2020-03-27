import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import getSafeLink from 'utils/getSafeLink';
import pinIcon from './assets/pin.svg';
import { OriginReference } from 'contexts/replaceurl';

const Wrapper = styled.div`
  max-width: 300px;
  min-width: 250px;
  color: #000000;
  padding: 0px 8px 8px;
`;

const Date = styled.p`
  color: #8995a0;
  font-family: Kanit, Arial, sans-serif;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
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
  margin-top: 14px;
`;

const Address = styled.p`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #636f7a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;
`;

const Detail = styled.pre`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  white-space: pre-wrap;
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const Link = styled.a`
  color: #8995a0;
  font-family: Kanit, Arial, sans-serif;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 4px;
  :hover {
    color: #8995a0;
  }
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
      <HeaderWrapper>
        <Date>
          {getTime()} {getTime() && data.link ? '•' : null}{' '}
          <Link href={getSafeLink(data.link)} target="_blank">
            {OriginReference({ reference: data.link, isShowhttps: false })}
          </Link>
        </Date>
      </HeaderWrapper>
      <Status>จุดคัดกรองที่ {data.order}</Status>
      {data.detail && <Detail>{data.detail}</Detail>}
      <Status>{`มีผล 26 มีนาคม - 30 เมษายน 2563`}</Status>
      <AddressWrapper>
        <Address>{data.address}</Address>
      </AddressWrapper>
    </Wrapper>
  );
};

CasePopup.propTypes = CasePopupPropTypes;

export default CasePopup;
