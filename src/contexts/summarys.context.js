import React, { createContext, useContext, useState, useEffect } from 'react';
import { FirebaseContext } from 'App';

const SummarysPropTypes = {};

const SummarysContext = createContext();

const SummarysProvider = SummarysContext.Provider;

const useSummarys = () => {
  const context = useContext(SummarysContext);
  if (context === undefined) {
    throw new Error('useSummarys must be used within a SummarysProvider');
  }
  return context;
};

const Summarys = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [parseSummarys, setParseSummarys] = useState();
  const [parseSummarysCNX, setParseSummarysCNX] = useState();

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('constants')
      .doc('latest')
      .get()
      .then(doc => {
        const data = doc.data();
        const getWordForNote = () => {
          const re = /\((.*?)\)/g;
          return re.exec(data['โน๊ตผู้ติดเชื้อ'])[1];
        };
        setParseSummarys({
          ...data,
          ['โน๊ตผู้ติดเชื้อ']: getWordForNote()
        });
      })
      .then(() =>
        db
          .collection('constants_cnx')
          .doc('latest')
          .get()
          .then(doc => {
            setParseSummarysCNX(doc.data());
          })
      );
  }, [firebase]);

  return (
    <SummarysProvider
      value={{
        summary: parseSummarys,
        summarycnx: parseSummarysCNX
      }}
    >
      {children}
    </SummarysProvider>
  );
};

Summarys.propTypes = SummarysPropTypes;

export { Summarys, useSummarys };
