import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useFetch from 'utils/useFetch';
import { getSummary } from 'services/case';
import userIcon from './assets/user.svg';
import hospitalIcon from './assets/hospital.svg';
import virusIcon from './assets/virus.svg';
import deadIcon from './assets/dead.svg';

const Wrapper = styled.div`
  padding: 16px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px 32px;
  justify-content: center;
`;

const Title = styled.p`
  ${({ theme }) => theme.typography.body()}
  color: ${({ theme }) => theme.color.neutralColor.gray};
  margin-bottom: 8px;
`;

const Value = styled.p`
  ${({ theme }) => theme.typography.bodyLarge()}
  color: ${({ theme }) => theme.color.black};
  margin: 0;
`;

const ValueSection = styled.div`
  padding-left: 38px;
  background-image: url(${({ icon }) => icon});
  background-position: 0 50%;
  background-repeat: no-repeat;
  background-size: 24px auto;
  height: 24px;
  display: flex;
  align-items: center;
`;

const SummaryItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.neutralColor.background};
  padding: 16px;
`;

const SummaryItemPropTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string
};
const SummaryItemDefaultProps = {
  value: '0'
};
const SummaryItem = ({ title, icon, value }) => {
  return (
    <SummaryItemWrapper>
      <Title>{title}</Title>
      <ValueSection icon={icon}>
        <Value>{value}</Value>
      </ValueSection>
    </SummaryItemWrapper>
  );
};
SummaryItem.propTypes = SummaryItemPropTypes;
SummaryItem.defaultProps = SummaryItemDefaultProps;

const Summary = () => {
  const { data } = useFetch(() => getSummary());

  return (
    <Wrapper>
      <SummaryItem title="หายแล้ว" icon={userIcon} value={data['หายแล้ว']} />
      <SummaryItem
        title="รักษาอยู่ใน รพ."
        icon={hospitalIcon}
        value={data['กำลังรักษา']}
      />
      <SummaryItem
        title="ติดเชื้อแล้ว"
        icon={virusIcon}
        value={data['ผู้ติดเชื้อ']}
      />
      <SummaryItem
        title="เสียชีวิต"
        icon={deadIcon}
        value={data['เสียชีวิต']}
      />
    </Wrapper>
  );
};

export default Summary;
