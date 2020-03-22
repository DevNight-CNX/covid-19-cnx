import React, { useState, useEffect } from 'react';
import { getReportList } from 'services/report';
import { List } from 'antd';
import CardCustom from 'components/Card';

const FullReport = () => {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportList().then(res => setReportList(res));
  }, []);

  return (
    <List>
      {reportList.map(report => {
        return (
          <CardCustom
            image={report.image}
            header={report.header}
            content={report.content}
            avatar={report.image}
            link={report.link}
          />
        );
      })}
    </List>
  );
};

export default FullReport;
