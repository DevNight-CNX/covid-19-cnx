import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback
} from 'react';
import { useHistory } from 'react-router-dom';
import { getReportList } from 'services/report';

const ReportContext = createContext();
const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};

const ReportProvider = ReportContext.Provider;
const Report = props => {
  const [reports, setReports] = useState([]);
  const [reliableReports, setReliableReports] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { push } = useHistory();

  const filterReliableReports = (reports = []) => {
    const reliables = reports
      .filter(report => report.likes && report.likes.length > 1)
      .filter(
        report =>
          report.dislikes &&
          report.likes &&
          report.likes.length > report.dislikes.length
      );
    return reliables;
  };

  const reqReports = useCallback(() => {
    setFetching(true);
    getReportList()
      .then(response => {
        const dataReliable = filterReliableReports(response);
        setReports(response);
        setReliableReports(dataReliable);
      })
      .catch(err => console.error(`[Request Reports]: ${err}`))
      .finally(() => {
        setFetching(false);
      });
  }, []);

  useEffect(() => {
    reqReports();
  }, [reqReports]);

  const viewReportDetail = id => {
    push(`/report/${id}`);
  };

  return (
    <ReportProvider
      value={{
        reports,
        reliableReports,
        fetching,
        reqReports,
        viewReportDetail
      }}
      {...props}
    />
  );
};
export { Report, useReport };
