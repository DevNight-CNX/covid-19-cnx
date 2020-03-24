import React, { useState } from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import { useReport } from 'contexts/report.context';
import fakeNewsIcon from './assets/fakeNews.svg';
import { Modal, ButtonCloseModal } from 'components/Modal';

const Wrapper = styled.div`
  ${({ theme }) => theme.typography.body()};
  color: ${({ theme }) => theme.color.error};
  background-color: ${({ theme }) => theme.color.neutralColor.background};
  padding: 8px 0;
  position: relative;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
`;

const FakeNewCount = () => {
  const { fakeReports } = useReport();
  const [isShowModal, setIsShowModal] = useState();

  return (
    <>
      <Wrapper onClick={() => setIsShowModal(true)}>
        <img
          src={fakeNewsIcon}
          alt="FakeNewsIcon"
          style={{ paddingRight: 16 }}
        />
        ข่าวปลอมที่ตรวจพบ {numeral(fakeReports.length).format('0,0')}
      </Wrapper>
      <Modal
        title={`ข่าวปลอมที่ตรวจพบ ${numeral(fakeReports.length).format('0,0')}`}
        visible={isShowModal}
        onOk={() => setIsShowModal(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        footer={[
          <ButtonCloseModal key="submit" onClick={() => setIsShowModal(false)}>
            ปิด
          </ButtonCloseModal>
        ]}
      >
        <p>
          แหล่งข่าวปลอมจะถูกตรวจสอบโดยชุมชนโดยรอบ หากข่าวใดถูกโหวตไม่น่าเชื่อถือ
          มากกว่า 50 คน จะถูกประเมินเข้าเกญว่าเป็นข่าวปลอมจากคนในพื้นที่
        </p>
      </Modal>
    </>
  );
};

export default FakeNewCount;
