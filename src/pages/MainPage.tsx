//메인 페이지
import styled from 'styled-components';
import React, { useState } from 'react';
import Myslide from './Myslide';
import {
  getDocs,
  where,
  query,
  collection,
  limit,
  getCountFromServer,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { dbService } from '../firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [category, setCategory] = useState('react');

  const [text, setText] = useState<string>('');

  // 전체 영상 불러오기
  const getData = async () => {
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

  // 영상 검색
  const searchVideoRequest = async (text: string) => {
    const q = query(
      collection(dbService, 'CLASS'),
      where('channelTitle', '>=', text),
      where('channelTitle', '<=', text + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    const searchItem: any[] = [];
    querySnapshot.docs.forEach((doc) => {
      searchItem.push({ id: doc.id, ...doc.data() });
    });
    console.log(searchItem);
    return searchItem;
  };

  const handleOnClick = async () => {
    const res = await searchVideoRequest(text);
    setDatas(res);
  };

  //promise 데이터 리스트로 변환
  const promise = getData();
  const [datas, setDatas] = useState<any>([]);
  const get = async () => {
    await promise.then((data) => {
      setDatas(data);
    });
    // console.log(datas)
  };

  useEffect(() => {
    get();
    // console.log(datas);
  }, [category]);

  return (
    <>
      <header>헤더공간</header>
      {/* 검색 인풋창 */}

      <MainPageSlideBanner>
        <Myslide />
      </MainPageSlideBanner>
      <div
        className='input__wrapper'
        style={{ width: '100', textAlign: 'center' }}
      >
        <input
          type='text'
          placeholder='Search Lecture Video'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // setVideoList(videos);
            setDatas(datas);
          }}
        />
        <button disabled={!text} onClick={handleOnClick}>
          Search
        </button>
      </div>
      <MainPageWrap>
        <Category>
          <CategoryBotton
            onClick={() => {
              setCategory('');
            }}
          >
            All
          </CategoryBotton>
          <CategoryBotton
            onClick={() => {
              setCategory('react');
            }}
          >
            React
          </CategoryBotton>
          <CategoryBotton
            onClick={() => {
              setCategory('javascript');
            }}
          >
            Javascript
          </CategoryBotton>
          <CategoryBotton
            onClick={() => {
              setCategory('typescript');
            }}
          >
            typescript
          </CategoryBotton>
          <CategoryBotton
            onClick={() => {
              setCategory('cs');
            }}
          >
            CS전공지식
          </CategoryBotton>
        </Category>

        <CantentWrap>
          {datas.map((data: any) => {
            console.log(data);
            return (
              <Link
                to={`/dashboard/${data.id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <CantentBox key={data.id}>
                  <Thumbnail src={data.thumbnail[0]} />
                  <LectureWrap>
                    <LectureTitle>{data.title}</LectureTitle>
                  </LectureWrap>
                  <Lecturer>{data.channelTitle}</Lecturer>
                </CantentBox>
              </Link>
            );
          })}
        </CantentWrap>
        {/* <button onClick={next}>test</button> */}
      </MainPageWrap>
    </>
  );
};

export default MainPage;

const MainPageWrap = styled.div`
  width: 100;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

//* 배너
const MainPageSlideBanner = styled.div`
  /* width: 100%; */
  margin-top: 30px;
  /* height: 400px; */
  background-color: #e3e3e3;
  align-items: center;
  display: flex;
`;

//* 카테고리
const Category = styled.div`
  width: 80%;
  height: 50px;
  padding-bottom: 30px;
  padding-top: 30px;
  justify-content: center;
  display: flex;
  border-bottom: 1px solid #e3e3e3;
`;

//* 카테고리 버튼
const CategoryBotton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 15px;
  border-color: transparent;
  margin-right: 10px;
  cursor: pointer;
`;

//* 단일강의컨텐츠박스
const CantentBox = styled.div`
  max-width: 300px;
  height: 300px;
  margin-top: 20px;
`;

//* 컨텐츠컨테이너
const CantentWrap = styled.div`
  width: 1320px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 40px;
  text-align: center;
`;

//* 썸네일
const Thumbnail = styled.img`
  width: 100%;
  height: 70%;
  /* padding-bottom: 50%; */
  background-color: beige;
  box-shadow: 0 10px 4px -4px #e3e3e3;
  display: flex;

  /* ::before {
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
    } */
`;

//* 강의내용 박스
const LectureWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 10px;
`;

//* 강의 제목
const LectureTitle = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; //보여질 줄 수
  -webkit-box-orient: vertical;
`;

//* 강의 내용
const LectureContent = styled.div`
  width: 100%;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; //보여질 줄 수
  -webkit-box-orient: vertical;
`;

//* 강의 주체자
const Lecturer = styled.span`
  width: 50px;
  margin: 10px 10px 0 10px;
  /* padding-right: 10px; */
  font-size: 10px;
  font-weight: bold;
  /* border-right: 1px solid; */
`;
