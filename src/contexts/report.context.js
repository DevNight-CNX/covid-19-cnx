import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback
} from 'react';
import { defaultTo } from 'ramda';
import { useHistory } from 'react-router-dom';
import { getReportList } from 'services/report';

const defaultToEmptyArray = defaultTo([]);

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
  const [fakeReports, setFakeReports] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { push } = useHistory();

  const filterReliableReports = (reports = []) => {
    const proveReliableNumber = 1;

    const reliables = reports
      .filter(
        report => defaultToEmptyArray(report.likes).length > proveReliableNumber
      )
      .filter(
        report =>
          defaultToEmptyArray(report.likes).length >
          defaultToEmptyArray(report.dislikes).length
      );
    return reliables;
  };

  const filterFakeReports = (reports = []) => {
    const proveFakeNumber = 1;

    const fakeReports = reports
      .filter(
        report => defaultToEmptyArray(report.dislikes).length > proveFakeNumber
      )
      .filter(
        report =>
          defaultToEmptyArray(report.dislikes).length >
          defaultToEmptyArray(report.likes).length
      );
    return fakeReports;
  };

  const reqReports = useCallback(() => {
    setFetching(true);
    getReportList()
      .then(response => {
        const dataReliable = filterReliableReports(response);
        const fakeReports = filterFakeReports(response);
        setReports(response);
        setReliableReports(dataReliable);
        setFakeReports(fakeReports);
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
        fakeReports,
        fetching,
        reqReports,
        viewReportDetail
      }}
      {...props}
    />
  );
};
export { Report, useReport };
