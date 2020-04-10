import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from 'App';

const ConstantSummarysPropTypes = { children: PropTypes.object };

const ConstantSummarysContext = createContext();

const ConstantSummarysProvider = ConstantSummarysContext.Provider;

const useConstantSummarys = () => {
  const context = useContext(ConstantSummarysContext);
  if (context === undefined) {
    throw new Error(
      'useConstantSummarys must be used within a ConstantSummarysProvider'
    );
  }
  return context;
};

const ConstantSummarys = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [constantSummarys, setConstantSummarys] = useState([]);
  const [constantSummarysCNX, setConstantSummarysCNX] = useState([]);

  const oneDay = 86400000;

  useEffect(() => {
    const db = firebase.firestore();
    const constants = [];
    const constantsCNX = [];

    db.collection('constants').onSnapshot(querySnapshot => {
      querySnapshot
        .docChanges()
        .filter(change => change.doc.id !== 'latest')
        .map(({ doc }) =>
          constants.push({
            data: doc.data(),
            id: doc.id,
            x: oneDay,
            y: doc.data()['ผู้ติดเชื้อ']
          })
        );

      setConstantSummarys(constants);
    });

    db.collection('constants_cnx').onSnapshot(querySnapshot => {
      querySnapshot
        .docChanges()
        .filter(change => change.doc.id !== 'latest')
        .map(({ doc }) =>
          constantsCNX.push({
            data: doc.data(),
            id: doc.id,
            x: oneDay,
            y: doc.data()['ผู้ติดเชื้อ']
          })
        );

      setConstantSummarysCNX(constantsCNX);
    });
  }, []);

  return (
    <ConstantSummarysProvider value={{ constantSummarys, constantSummarysCNX }}>
      {children}
    </ConstantSummarysProvider>
  );
};

ConstantSummarys.propTypes = ConstantSummarysPropTypes;

export { ConstantSummarys, useConstantSummarys };
