import { useState, useEffect } from 'react';
import { db } from '../firebase';

export function useCollection(path, orderBy, where = []) {
  const [state, setState] = useState([]);
  const [queryField, queryOperator, queryValue] = where;

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }
    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue);
    }

    return collection.onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setState(docs);
    });
  }, [path, orderBy, queryField, queryOperator, queryValue]);
  return state;
}
