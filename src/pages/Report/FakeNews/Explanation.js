import React from 'react';
import styled from 'styled-components';

const ExplanationWrapper = styled.div`
  ${({ theme }) => theme.typography.body()};
  background-color: ${({ theme }) => theme.color.secondaryColor.gold};
  padding: 24px 26px;
`;
ExplanationWrapper.Title = styled.div`
  ${({ theme }) => theme.typography.bodyLarge()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  margin-bottom: 8px;
`;
ExplanationWrapper.Content = styled.div`
  color: ${({ theme }) => theme.color.neutralColor.black};
`;

const Explanation = () => {
  return (
    <ExplanationWrapper>
      <ExplanationWrapper.Title>คำชี้แจง</ExplanationWrapper.Title>
      <ExplanationWrapper.Content>
        <p>
          เนื่องด้วยข้อมูลในปัจจุบันไม่มีเพียงต่อประชาชนโดย รอบ
          จากสถานการณ์ของโรคระบาดในประเทศไทย
          ทีมพัฒนาจึงรวบรวมชุมชนแหล่งข่าวจากคนในพื้นที่
          และคัดกรองความน่าเชื่อถือของข่าวด้วยกันเองขึ้นมา
          เบาะแสจากข่าวสถานที่ตำแหน่งในภาคเหนืออาจจะ ทำให้สื่อถึงจุดประสงค์ของ
          การนำเสนอที่ผิดพลาดได้.
        </p>
        <p>
          มีข้อเสนอแนะ ติดต่อได้ที่ <br />
          <a href="mailto:covid19.cnx@gmail.com"> covid19.cnx@gmail.com</a>
        </p>
        <p>
          ความรู้สู้ COVID-19 <br />
          <a href="https://ddc.moph.go.th" target="_blank">
            https://ddc.moph.go.th
          </a>
        </p>
      </ExplanationWrapper.Content>
    </ExplanationWrapper>
  );
};

export default Explanation;
