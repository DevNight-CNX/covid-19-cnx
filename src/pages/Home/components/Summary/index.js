import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useFetch from 'utils/useFetch';
import { getSummary, getSummaryCNX } from 'services/case';
import userIcon from './assets/user.svg';
import hospitalIcon from './assets/hospital.svg';
import virusIcon from './assets/virus.svg';
import deadIcon from './assets/dead.svg';
import { Skeleton } from 'antd';
import { prop } from 'ramda';
import { useReport } from 'contexts/report.context';
import { useSummarys } from 'contexts/summarys.context';

const Title = styled.p`
  ${({ theme }) => theme.typography.body()}
  color: ${({ theme }) => theme.color.neutralColor.gray};
  margin-bottom: 8px;
  @media screen and (max-width: 600px) {
  display: grid;    
  }
`;

const Value = styled.p`
  ${({ theme }) => theme.typography.bodyLarge()}
  color: ${({ theme }) => theme.color.black};
  margin: 0;
`;

const Note = styled.span`
  ${({ theme }) => theme.typography.caption()}
  color: ${({ theme }) => theme.color.gray};
  margin: 0;
  margin-left: 8px;
  @media screen and (max-width: 600px) {
    margin-top:  ${({ note, isShow }) => (note && !isShow ? `0px` : `13px`)};
    margin-left: 0px;
  }
  @media screen and (max-width: 397px) {
    margin-top:  ${({ note, isShow }) => (note && !isShow ? `0px` : `26px`)};
  }
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

const SkeletonAvatarWarpper = styled.div`
  display: flex;
  width: 45px;
`;

const SummaryItemPropTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string,
  note: PropTypes.string,
  isShow: PropTypes.bool
};
const SummaryItemDefaultProps = {
  value: '0'
};
const SummaryItem = ({ title, icon, value, note, isShow }) => {
  const { fetching } = useReport();

  return (
    <>
      <SummaryItemWrapper>
        <Title>
          {title}
          <Note note={note} isShow={isShow}>
            {isShow ? null : note}
          </Note>
        </Title>
        {fetching ? (
          <SkeletonAvatarWarpper>
            <Skeleton.Avatar active={fetching} size="small" shape="circle" />
            <Value>0</Value>
          </SkeletonAvatarWarpper>
        ) : (
          <ValueSection icon={icon}>
            <Value>{value}</Value>
          </ValueSection>
        )}
      </SummaryItemWrapper>
    </>
  );
};
SummaryItem.propTypes = SummaryItemPropTypes;
SummaryItem.defaultProps = SummaryItemDefaultProps;

const Summary = ({ isFilterInChiangmai }) => {
  const { summary, summarycnx } = useSummarys();

  console.log('summarycnx', summarycnx);

  return (
    <>
      <SummaryItem
        title="ติดเชื้อแล้ว"
        icon={virusIcon}
        value={
          isFilterInChiangmai
            ? prop('ผู้ติดเชื้อ', summarycnx)
            : prop('ผู้ติดเชื้อ', summary)
        }
        note={
          isFilterInChiangmai
            ? prop('โน๊ตผู้ติดเชื้อ', summarycnx)
            : prop('โน๊ตผู้ติดเชื้อ', summary)
        }
      />
      <SummaryItem
        title="เสียชีวิต"
        icon={deadIcon}
        value={
          isFilterInChiangmai
            ? prop('เสียชีวิต', summarycnx)
            : prop('เสียชีวิต', summary)
        }
      />
      <SummaryItem
        title="หายแล้ว"
        icon={userIcon}
        value={
          isFilterInChiangmai
            ? prop('หายแล้ว', summarycnx)
            : prop('หายแล้ว', summary)
        }
      />

      <SummaryItem
        title="รักษาอยู่ใน รพ."
        icon={hospitalIcon}
        value={
          isFilterInChiangmai
            ? prop('กำลังรักษา', summarycnx)
            : prop('กำลังรักษา', summary)
        }
      />
    </>
  );
};

export default Summary;
