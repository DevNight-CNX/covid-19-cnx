import React, { useState } from 'react';
import styled from 'styled-components';
import newsIcon from '../assets/news.svg';
import hospitalIcon from '../assets/hospital.svg';
import rippleIcon from '../assets/ripple.svg';
import policeIcon from '../assets/police.svg';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, ButtonCloseModal } from 'components/Modal';

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 0px;
`;

const Icon = styled.img`
  width: ${({ width }) => width}px;
  margin-right: 16px;
`;

const Detail = styled.p`
  ${({ theme }) => theme.typography.bodySmall()}
  color: ${({ theme }) => theme.color.neutralColor.darkGray};
  margin: 0;
  margin-left: 8px;
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => theme.typography.bodySmall()}
  background-color: ${({ theme }) => theme.color.white};
  padding: 6px 10px;
  bottom: 16px;
  right: 16px;
  position: absolute;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 101px;
  height: 33px;
  text-align: center;
  display: flex;
  cursor: pointer;

  svg {
    font-size: 21px;
  }
`;

const ButtonContent = styled.p`
  color: ${({ theme }) => theme.color.dark};
  padding: 4px 6px;
`;

const IconDetail = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ButtonWrapper onClick={() => setVisible(true)}>
        <QuestionCircleOutlined />
        <ButtonContent>สัญลักษณ์</ButtonContent>
      </ButtonWrapper>
      <Modal
        title="สัญลักษณ์"
        visible={visible}
        onOk={() => setVisible(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        footer={[
          <ButtonCloseModal key="submit" onClick={() => setVisible(false)}>
            ปิด
          </ButtonCloseModal>
        ]}
      >
        <IconWrapper
          style={{
            marginTop: 8
          }}
        >
          <Icon src={rippleIcon} width={21} />
          <Detail>พื้นที่เสี่ยง</Detail>
        </IconWrapper>
        <IconWrapper>
          <Icon src={newsIcon} width={21} />
          <Detail>แหล่งข่าว</Detail>
        </IconWrapper>
        <IconWrapper>
          <Icon src={hospitalIcon} width={21} />
          <Detail>โรงพยาบาล</Detail>
        </IconWrapper>
        <IconWrapper
          style={{
            marginTop: 8
          }}
        >
          <Icon src={policeIcon} width={21} />
          <Detail>จุดคัดกรอง</Detail>
        </IconWrapper>
      </Modal>
    </>
  );
};

export default IconDetail;
