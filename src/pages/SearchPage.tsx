import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { dbService } from '../firebase';

const SearchPage = () => {
  // 영상 검색
  // const searchVideoRequest = async (text: string) => {
  //   const q = query(
  //     collection(dbService, 'CLASS'),
  //     // where('channelTitle', '>=', text),
  //     where('channelTitle', '>=', text),
  //     where('channelTitle', '<=', text + '\uf8ff')
  //   );
  //   const querySnapshot = await getDocs(q);
  //   const searchItem: any[] = [];
  //   querySnapshot.docs.forEach((doc) => {
  //     searchItem.push({ id: doc.id, ...doc.data() });
  //   });
  //   console.log(searchItem);
  //   return searchItem;
  // };

  // const handleOnClick = async () => {
  //   const res = await searchVideoRequest(title);
  //   setDatas(res);
  // };

  return <div>SearchBar</div>;
};

export default SearchPage;
