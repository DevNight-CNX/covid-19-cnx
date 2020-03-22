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
            reference={report.link}
            location={report.location}
            another={report.header.another}
            id={report.id}
            dislikes={report.dislikes}
            likes={report.likes}
          />
        );
      })}
    </List>
  );
};

export default FullReport;
