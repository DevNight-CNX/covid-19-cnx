import React from 'react';
import styled from 'styled-components';
import FakeNewsIcon from './assets/FakeNews.svg';

const FakeNewsContainer = styled.div`
  display: block;
  justify-content: center;
  margin: auto;
`;

const FakeNewsWrapper = styled.p`
  position: relative;
  ${({ theme }) => theme.typography.body()};
  color: ${({ theme }) => theme.color.error};
  background-color: ${({ theme }) => theme.color.neutralColor.background};
  max-width: 360px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const ExplanationWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.secondaryColor.gold};
  max-width: 360px;
  width: 100%;
  height: 300px;
  padding: 24px 38px 35px 26px;

  .header {
    ${({ theme }) => theme.typography.bodyLarge()};
    color: ${({ theme }) => theme.color.neutralColor.black};
    margin-bottom: 8px;
  }
  .content {
    ${({ theme }) => theme.typography.body()};
    color: ${({ theme }) => theme.color.neutralColor.black};
    margin-bottom: 16px;
  }
`;

const FakeNewsReport = () => {
  return (
    <FakeNewsContainer>
      <FakeNewsWrapper>
        <img
          src={FakeNewsIcon}
          alt="FakeNewsIcon"
          style={{ paddingRight: 16 }}
        />
        ข่าวปลอมที่ตรวจพบ 1,987
      </FakeNewsWrapper>
      <ExplanationWrapper>
        <div className="header">คำชี้แจง</div>
        <div className="content">
          <div className="content">
            เนื่องด้วยข้อมูลในปัจจุบันไม่มีเพียงต่อประชาชนโดย รอบ
            จากสถานการณ์ของโรคระบาดในประเทศไทย
            ทีมพัฒนาจึงรวบรวมชุมชนแหล่งข่าวจากคนในพื้นที่
            และคัดกรองความน่าเชื่อถือของข่าวด้วยกันเองขึ้นมา
            เบาะแสจากข่าวสถานที่ตำแหน่งในภาคเหนืออาจจะ ทำให้สื่อถึงจุดประสงค์ของ
            การนำเสนอที่ผิดพลาดได้.
          </div>
          <div className="content">
            มีข้อเสนอแนะ ติดต่อได้ที่
            <div>
              <a href="email@gmail.com"> email@gmail.com</a>
            </div>
          </div>
          <div>
            ความรู้สู้ Covin-19
            <div>
              <a href="https://ddc.moph.go.th">https://ddc.moph.go.th</a>
            </div>
          </div>
        </div>
      </ExplanationWrapper>
    </FakeNewsContainer>
  );
};

export default FakeNewsReport;
