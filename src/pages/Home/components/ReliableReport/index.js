import React from 'react';
import Card from 'components/Card';
import styled from 'styled-components';
import { useReport } from 'contexts/report.context';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as EmptyIcon } from './assets/subtract.svg';

const ReliableReportNews = () => {
  const { reliableReports, viewReportDetail } = useReport();
  const settings = {
    className: '',
    dots: false,
    fade: false,
    infinite: true,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <>
      {reliableReports.length ? (
        <SliderCustom {...settings}>
          {reliableReports.map((report, i) => {
            if (i % 2) return null;
            const secReport = reliableReports[i + 1];
            return (
              <div key={i}>
                <Card
                  key={report.id}
                  report={report}
                  onClick={viewReportDetail}
                  image={report.image}
                  header={report.header}
                  content={report.content}
                  avatar={report.avatar}
                  reference={report.link}
                  location={report.location}
                  another={report.header.another}
                  id={report.id}
                  dislikes={report.dislikes}
                  likes={report.likes}
                  address={report.address}
                />
                {!isEmpty(secReport) ? (
                  <Card
                    key={secReport.id}
                    report={secReport}
                    onClick={viewReportDetail}
                    image={secReport.image}
                    header={secReport.header}
                    content={secReport.content}
                    avatar={secReport.avatar}
                    reference={secReport.link}
                    location={secReport.location}
                    another={secReport.header.another}
                    id={secReport.id}
                    dislikes={secReport.dislikes}
                    likes={secReport.likes}
                    address={report.address}
                  />
                ) : null}
              </div>
            );
          })}
        </SliderCustom>
      ) : (
        <EmptyState>ไม่มีข้อมูล</EmptyState>
      )}
    </>
  );
};

export default ReliableReportNews;

const EmptyWrapper = styled.div`
  height: 209px;
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

const SliderCustom = styled(Slider)`
  && {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
