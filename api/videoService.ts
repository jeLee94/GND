import React from 'react';
import {
  getDocs,
  where,
  query,
  collection,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { dbService } from '../firebase';

export const getVideoRequest = async () => {
  let list: object[] = [];
  const firstPage = query(
    collection(dbService, 'CLASS'),

    category !== ''
      ? where('category', '==', category)
      : where('category', '!=', category),
    // orderBy('title', 'desc'),
    limit(16)
  );
  // const countSnap = await getCountFromServer(
  //   collection(dbService, 'CLASS')
  // );
  // console.log('count', countSnap.data().count);
  const querySnapshot = await getDocs(firstPage);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  // console.log('l', lastVisible);
  const next = query(
    collection(dbService, 'CLASS'),
    orderBy('title', 'desc'),
    startAfter(lastVisible),
    limit(16)
  );
  querySnapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };
    list.push(obj);
    // console.log(obj)
  });
  return list;
};
