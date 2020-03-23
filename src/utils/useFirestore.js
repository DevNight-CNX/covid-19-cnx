import { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from 'App';

const useFirestore = (getCollection = db => db, parse = data => data) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const db = firebase.firestore();

    getCollection(db).onSnapshot(querySnapshot => {
      const listData = [];
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === 'added') {
          listData.push(change.doc.data());
        }
      });
      if (listData.length > 0) {
        setData(prevListData => [...listData, ...prevListData]);
        setLoading(false);
      }
    });
  }, []);

  return { data, loading };
};

export default useFirestore;
