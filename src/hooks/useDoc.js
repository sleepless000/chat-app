import { useState, useEffect } from 'react';
import { db } from '../firebase';

export function useDoc(path) {
  const [state, setState] = useState(null);
  useEffect(() => {
    return db.doc(path).onSnapshot(doc => {
      setState({
        ...doc.data(),
        id: doc.id
      });
    });
  }, [path]);
  return state;
}
