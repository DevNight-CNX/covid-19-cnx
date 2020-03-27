/* stylelint-disable property-no-vendor-prefix */
/* stylelint-disable value-no-vendor-prefix */

import React from 'react';
import PropTypes from 'prop-types';
import { prop } from 'ramda';
import styled from 'styled-components';
import moment from 'moment';
import getSafeLink from 'utils/getSafeLink';
import pinIcon from './assets/pin.svg';
import { OriginReference } from 'contexts/replaceurl';

const Wrapper = styled.div`
  max-width: 300px;
  color: #000000;
  padding: 8px 12px 8px 10px;
`;

const Text = styled.p`
  font-family: Kanit, Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

const Nation = styled(Text)`
  font-size: 14px;
  margin-bottom: 0px;
`;

const Identity = styled(Text)`
  font-size: 14px;
  color: #636f7a;
  font-weight: normal;
`;

const Status = styled(Text)`
  font-weight: normal;
  margin: 0;
  display: inline-block;
`;

Status.Title = styled(Text)`
  display: inline;
  font-size: 13px;
`;

Status.UnknownLocation = styled(Status.Title)`
  display: inline;
  font-size: 10px;
  font-weight: normal;
  color: #ff3b30;
`;

const Title = styled.p`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 4px;
`;

const NewsTitle = styled(Title)`
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 18px;
  max-width: 40ch;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 70px;
  display: -webkit-box;
  position: relative;
`;

const ReadMoreWrapper = styled.div`
  display: flex;
  margin-left: auto;
  flex: 1 0 auto;
`;

const ReadMore = styled.a`
  font-family: Kanit, Arial, sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #2962ff;
  margin-right: 8px;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

const StatementDate = styled.p`
  color: #8995a0;
  font-family: Kanit, Arial, sans-serif;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 4px;
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

const AddressWrapper = styled.div`
  padding-left: 20px;
  background-image: url(${pinIcon});
  background-position: 0 50%;
  background-repeat: no-repeat;
  margin-right: 4px;
  width: calc(100% - 40px);
`;

const Address = styled.p`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #636f7a;
  margin-bottom: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const FooterWrapper = styled.div`
  display: flex;
  position: relative;
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

const NewsPopupPropTypes = {
  data: PropTypes.shape({
    time: PropTypes.string,
    title: PropTypes.string,
    unknownLocation: PropTypes.bool,
    newsLink: PropTypes.string,
    address: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string
  }),
  history: PropTypes.object
};

const NewsPopup = ({ data = {} }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <StatementDate>
          {data.time || null} {data.time && data.newsLink ? '•' : null}{' '}
          <Link href={getSafeLink(data.newsLink)} target={'_blank'}>
            {OriginReference({ reference: data.newsLink, isShowhttps: false })}
          </Link>
        </StatementDate>
      </HeaderWrapper>
      <NewsTitle>{data.title} </NewsTitle>
      {data.unknownLocation ? (
        <Status>
          <Status.UnknownLocation>
            ไม่สามารถระบุตำแหน่งที่ชัดเจนได้
          </Status.UnknownLocation>
        </Status>
      ) : null}
      <FooterWrapper>
        {data.address ? (
          <AddressWrapper>
            <Address>{data.address}</Address>
          </AddressWrapper>
        ) : null}
        <ReadMoreWrapper>
          {data.type ? (
            <>
              {data.title.length < 120 ? null : (
                <ReadMore href={`/report/${data.id}`} target={'_blank'}>
                  อ่านต่อ
                </ReadMore>
              )}
            </>
          ) : null}
        </ReadMoreWrapper>
      </FooterWrapper>
    </Wrapper>
  );
};

NewsPopup.propTypes = NewsPopupPropTypes;

export default NewsPopup;
