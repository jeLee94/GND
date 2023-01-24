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
} from 'firebase/firestore';
import { dbService } from '../firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const videos = [
    {
      category: 'react',
      title:
        '네이티브 앱, 리액트 네이티브 앱 으로! 개발자와 PM의 진짜 이야기 | RIDIBOOKS app 1부 | 리디 RIDI dev.',
      thumbnail: 'https://i.ytimg.com/vi/scZI19SE0_4/hqdefault.jpg',
    },
  ];

  const [text, setText] = useState<string>('');
  const [searchVideos, setSearchVideos] = useState([]);
  const [videoList, setVideoList] = useState<
    { category: string; title: string; thumbnail: string }[] | undefined
  >(videos);

  const getData = async () => {
    let list: object[] = [];
    const q = query(
      collection(dbService, 'CLASS'),
      where('category', '==', 'react'),
      limit(5)
    );
    const countSnap = await getCountFromServer(collection(dbService, 'CLASS'));
    console.log('count', countSnap.data().count);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      list.push(obj);
    });
    return list;
  };

  // FB에서 영상 검색
  const searchBookRequest = async (text: string) => {
    const q = query(
      collection(dbService, 'CLASS'),
      where('title', '>=', text),
      where('title', '<=', text + '\uf8ff')
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
    const res = await searchBookRequest(text);
    setVideoList(res);
  };

  //promise 데이터 리스트로 변환
  const promise = getData();
  const [datas, setDatas] = useState<any>([]);
  const get = async () => {
    await promise.then((data) => {
      setDatas(data);
    });
  };

  useEffect(() => {
    get();
    console.log(datas);
  }, []);

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
            setVideoList(videos);
          }}
        />
        <button disabled={!text} onClick={handleOnClick}>
          Search
        </button>
      </div>
      <MainPageWrap>
        <Category>
          <CategoryBotton>프로그래밍</CategoryBotton>
          <CategoryBotton>웹 개발</CategoryBotton>
          <CategoryBotton>앱 개발</CategoryBotton>
          <CategoryBotton>디자인</CategoryBotton>
          <CategoryBotton>생활코딩</CategoryBotton>
        </Category>

        <CantentWrap>
          {datas.map((data: any) => {
            return (
              <Link to={`/dashboard/${data.id}`}>
                <CantentBox key={data.id}>
                  <Thumbnail src={data.thumbnail} />
                  <LectureWrap>
                    <LectureTitle>{data.title}</LectureTitle>
                    <LectureContent>{data.description}</LectureContent>
                  </LectureWrap>
                  <Lecturer>{data.channelTitle}</Lecturer>
                </CantentBox>
              </Link>
            );
          })}
        </CantentWrap>
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
  margin-top: 50px;
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

//* 강의 날짜
const LectureDate = styled.span`
  font-size: 10px;
  font-weight: bold;
`;
