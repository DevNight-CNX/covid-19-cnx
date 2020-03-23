import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Subtract } from './assets/subtract.svg';

const Wrapper = styled.div`
  padding: 16px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const ButtonsWrapper = styled.div`
  height: 209px;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  margin-top: 25px;
  > button:not(:first-child) {
    margin-left: 15px;
  }
`;
const WrapperCards = styled.div`
  margin-top: 15px;
`;

const EmptyIcon = styled(Subtract)``;

const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.body()}
`;

const EmptyTitle = styled.div`
  margin: 15px auto 4px;
`;

const EmptyDescription = styled.div`
  max-width: 307px;
  ${({ theme }) => theme.typography.bodySmallHighlight()};
  text-align: center;
`;

const EmptyState = () => {
  return (
    <EmptyWrapper>
      <EmptyIcon />
      <EmptyTitle>ยังไม่มีข้อมูล</EmptyTitle>
      <EmptyDescription>
        กำลังประมวลผล และคัดกรองข่าวจากชุมชน <br />
        คุณสามารถเป็นส่วนนึงของการคัดกรองข่าว
        <br />
        โดยการโหวตความน่าเชื่อถือของข่าวได้ ในส่วนของ “ข่าวทั้งหมด”
      </EmptyDescription>
    </EmptyWrapper>
  );
};

export { Wrapper, ButtonsWrapper, WrapperCards, EmptyState };
