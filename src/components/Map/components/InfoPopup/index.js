import React from 'react';
import PropTypes from 'prop-types';
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
  font-size: 13px;
  font-weight: normal;
`;

const Title = styled.p`
  font-family: Kanit, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 2px;
`;

const NewsTitle = styled(Title)`
  font-size: 14px;
  line-height: 18px;
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
  return (
    <Wrapper>
      <Title>{data.treatAt}</Title>
      <StatementDate>{moment(data.statementDate).fromNow()}</StatementDate>
      <Nation>{data.nationality}</Nation>
      <Identity>
        อายุ {data.age} เพศ {data.gender}
      </Identity>
      <Status>
        <Status.Title>สถานะ </Status.Title>
        <StatusColor type={data.status}>{data.status}</StatusColor>
      </Status>
      <LinkWrapper>
        {data.references.map((ref, index) => (
          <Link href={ref} target="_blank">
            ลิ้งค์ข่าว {index + 1}
          </Link>
        ))}
      </LinkWrapper>
    </Wrapper>
  );
};

CasePopup.propTypes = InfoPopupPropTypes;

const NewsPopup = ({ data = {} }) => {
  const getTime = () => {
    console.log(
      'moment(data.time)',
      moment(data.time),
      data.time,
      moment(data.time).fromNow(),
      moment(data.time).format('DD/MM/YYYY')
    );
    return moment(data.time).fromNow() === 'Invalid date'
      ? moment(data.time, 'DD/MM/YYYY').fromNow()
      : moment(data.time).fromNow();
  };

  return (
    <Wrapper>
      <NewsTitle>{data.title}</NewsTitle>
      <StatementDate>{getTime()}</StatementDate>
      <Nation>{data.nationality}</Nation>
      {data.unknownLocation ? (
        <Status>
          <Status.UnknownLocation>
            ไม่สามารถระบุตำแหน่งที่ชัดเจนได้
          </Status.UnknownLocation>
        </Status>
      ) : null}
      <LinkWrapper>
        <Link href={data.newsLink} target="_blank">
          ลิ้งค์ข่าว
        </Link>
      </LinkWrapper>
    </Wrapper>
  );
};

NewsPopup.propTypes = InfoPopupPropTypes;

export { NewsPopup, CasePopup };
