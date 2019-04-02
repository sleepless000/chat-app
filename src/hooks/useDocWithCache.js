import { useState, useEffect } from 'react';
import { db } from '../firebase';

const cash = {};
const pendingCash = {};

export function useDocWithCache(path) {
  const [state, setState] = useState(cash[path]);
  useEffect(() => {
    if (state) return;

    let stillMounted = true;
    const pending = pendingCash[path];

    const promise = pending || (pendingCash[path] = db.doc(path).get());

    promise.then(doc => {
      if (stillMounted) {
        setState({
          ...doc.data(),
          id: doc.id
        });
      }
    });
    return () => {
      stillMounted = false;
    };
  }, [path]);
  return state;
}
