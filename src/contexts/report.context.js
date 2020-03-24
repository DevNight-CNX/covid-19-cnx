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
import { FirebaseContext } from 'App.js';
import { getReportById } from 'services/report';

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
  const [reports, setReports] = useState(undefined);
  const [newReports, setNewReports] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { push } = useHistory();
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (!reports) {
      return;
    }

    const db = firebase.firestore();

    db.collection('notifications')
      .doc('report')
      .collection('items')
      .onSnapshot(querySnapshot => {
        const notiReports = [];

        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === 'added') {
            notiReports.push(change.doc.id);
          }
        });

        const newReports = notiReports.filter(notiReport => {
          return !reports.some(item => {
            return item.id === notiReport;
          });
        });

        Promise.all(newReports.map(id => getReportById(id))).then(
          newReports => {
            setNewReports(reports => [...reports, ...newReports]);
          }
        );
      });
  }, [reports]);

  const filterReliableReports = (reports = []) => {
    const proveReliableNumber = 100;

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
    const proveFakeNumber = 100;

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
        setReports(response);
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

  const allReports = [...defaultToEmptyArray(reports), ...newReports];

  return (
    <ReportProvider
      value={{
        reports: allReports,
        reliableReports: filterReliableReports(allReports),
        fakeReports: filterFakeReports(allReports),
        fetching,
        reqReports,
        viewReportDetail
      }}
      {...props}
    />
  );
};
export { Report, useReport };
