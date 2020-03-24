import React from 'react';
import PropTypes from 'prop-types';
import { prop } from 'ramda';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  max-width: 300px;
  color: #000000;
  padding: 8px 24px;
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
  margin-bottom: 2px;
`;

const LinkWrapper = styled.div`
  display: flex;
`;

const Link = styled.a`
  font-family: Kanit, Arial, sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #2962ff;
  margin-right: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const StatementDate = styled.p`
  color: #8995a0;
  font-family: Kanit, Arial, sans-serif;
  font-size: 12px;
  line-height: 16px;
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

const InfoPopupPropTypes = {
  data: PropTypes.object
};

const CasePopup = ({ data = {} }) => {
  const getTime = () => {
    const time = prop('seconds', data.statementDate);
    return moment.unix(time).fromNow() === 'Invalid date'
      ? null
      : moment.unix(time).fromNow();
  };

  return (
    <Wrapper>
      {data.treatAt ? <Title>{data.treatAt}</Title> : null}
      {getTime() ? <StatementDate>{getTime()}</StatementDate> : null}
      <Nation>{data.nationality}</Nation>
      <Identity>
        อายุ {data.age} เพศ {data.gender}
      </Identity>
      <Status>
        <Status.Title>สถานะ </Status.Title>
        <StatusColor type={data.status}>{data.status}</StatusColor>
      </Status>
      {data.unknownLocation ? (
        <Status>
          <Status.UnknownLocation>
            ไม่สามารถระบุตำแหน่งที่ชัดเจนได้
          </Status.UnknownLocation>
        </Status>
      ) : null}
      <LinkWrapper>
        {data.references.map((ref, index) => (
          <Link href={ref} target="_blank">
            ลิงก์ข่าว {index + 1}
          </Link>
        ))}
      </LinkWrapper>
    </Wrapper>
  );
};

CasePopup.propTypes = InfoPopupPropTypes;

const NewsPopup = ({ data = {} }) => {
  const getTime = () => {
    const time = prop('seconds', data.time);
    return moment.unix(time).fromNow() === 'Invalid date'
      ? null
      : moment.unix(time).fromNow();
  };

  return (
    <Wrapper>
      <NewsTitle>{data.title}</NewsTitle>
      {getTime() ? <StatementDate>{getTime()}</StatementDate> : null}
      {data.unknownLocation ? (
        <Status>
          <Status.UnknownLocation>
            ไม่สามารถระบุตำแหน่งที่ชัดเจนได้
          </Status.UnknownLocation>
        </Status>
      ) : null}
      <LinkWrapper>
        <Link href={data.newsLink} target="_blank">
          ลิงก์ข่าว
        </Link>
      </LinkWrapper>
    </Wrapper>
  );
};

NewsPopup.propTypes = InfoPopupPropTypes;

export { NewsPopup, CasePopup };
