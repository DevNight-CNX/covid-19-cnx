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
    db.collection('constants')
      .get()
      .then(doc => {
        doc.docs.map((res, index) => {
          return (
            index + 1 !== doc.docs.length &&
            setConstantSummarys(constantSummarys => {
              const data = res.data();
              const pasreConstants = {
                data,
                x: oneDay,
                y: data['ผู้ติดเชื้อ'],
                id: doc.docs[index].id
              };
              return [...constantSummarys, pasreConstants];
            })
          );
        });
      })
      .then(() =>
        db
          .collection('constants_cnx')
          .get()
          .then(doc =>
            doc.docs.map((res, index) => {
              return (
                index + 1 !== doc.docs.length &&
                setConstantSummarysCNX(constantSummarysCNX => {
                  const data = res.data();
                  const pasreConstantsCNX = {
                    data,
                    x: oneDay,
                    y: data['ผู้ติดเชื้อ'],
                    id: doc.docs[index].id
                  };
                  return [...constantSummarysCNX, pasreConstantsCNX];
                })
              );
            })
          )
      )
      .catch(error => console.error(error));
  }, []);

  return (
    <ConstantSummarysProvider value={{ constantSummarys, constantSummarysCNX }}>
      {children}
    </ConstantSummarysProvider>
  );
};

ConstantSummarys.propTypes = ConstantSummarysPropTypes;

export { ConstantSummarys, useConstantSummarys };
