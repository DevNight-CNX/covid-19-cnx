import React from 'react';
import Card from 'components/Card';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useReport, parseReportToCard } from 'contexts/report.context';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as EmptyIcon } from './assets/subtract.svg';
import { withRouter } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const EmptyWrapper = styled.div`
  height: 209px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.body()};
  background-color: ${({ theme }) => theme.color.neutralColor.white};
  border-radius: 4px;
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
        คุณสามารถเป็นส่วนหนึ่งของการคัดกรองข่าว
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
    .slick-list {
      border-radius: 4px;
    }
  }
`;

const ReliableReportNewsPropTypes = {
  match: PropTypes.object
};

const ReliableReportNews = ({ match }) => {
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

  const isDesktop = useMediaQuery({
    query: '(min-width: 1100px)'
  });

  const IsFull = () => {
    if (isDesktop) {
      return true;
    } else if (match.path !== '/report/:id') {
      return true;
    }
    return false;
  };

  return (
    <>
      {reliableReports.length ? (
        <SliderCustom {...settings}>
          {reliableReports.reverse().map((report, i) => {
            if (i % 2) return null;
            const secReport = reliableReports[i + 1];
            return (
              <div key={i}>
                <Card
                  report={report}
                  onClick={viewReportDetail}
                  isFull={IsFull()}
                  {...parseReportToCard(report)}
                />
                {!isEmpty(secReport) ? (
                  <Card
                    report={secReport}
                    onClick={viewReportDetail}
                    isFull={IsFull()}
                    {...parseReportToCard(secReport)}
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

ReliableReportNews.propTypes = ReliableReportNewsPropTypes;

export default withRouter(ReliableReportNews);
