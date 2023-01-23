//메인 페이지
import styled from 'styled-components';
import React from 'react';
import Myslide from './Myslide';
import { useState, useEffect } from 'react';
// 회수 수정
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from 'firebase/firestore';
import { dbService } from '../firebase';

const MainPage = () => {
  const [videos, setVideos] = useState([]);

  // 회수 수정
  // FB에서 영상 불러오기
  // const getVideoRequest = (setVideos) => {
  //   const q = query(
  //     collection(dbService, 'CLASS')
  //     // orderBy('createdAt', 'desc')
  //   );

  //   onSnapshot(q, (snapshot) => {
  //     const newVideos = snapshot.docs.map((doc) => {
  //       const newVideo = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //       // console.log(newVideo);
  //       return newVideo;
  //     });
  //     setVideos(newVideos);
  //     console.log(newVideos);
  //   });
  //   // console.log(videos);
  // };

  const getVideoRequest = () => {
    const q = query(collection(dbService, 'CLASS'));

    getDocs(q).then((querySnapshot) => {
      const videoList = [];
      querySnapshot.forEach((doc) => {
        videoList.push({
          channelTitle: doc.data().channelTitle,
          description: doc.data().description,
          thumbnail: doc.data().thumbnail,
          title: doc.data().title,
        });
      });
      setVideos(videoList);
      console.log(videoList);
    });
  };

  useEffect(getVideoRequest, []);

  return (
    <>
      <header>헤더공간</header>
      <MainPageSlideBanner>
        <Myslide></Myslide>
      </MainPageSlideBanner>
      <MainPageWrap>
        <Category>
          <CategoryBotton>프로그래밍</CategoryBotton>
          <CategoryBotton>웹 개발</CategoryBotton>
          <CategoryBotton>앱 개발</CategoryBotton>
          <CategoryBotton>디자인</CategoryBotton>
          <CategoryBotton>생활코딩</CategoryBotton>
        </Category>

        <CantentWrap>
          <div>
            {videos.map((video) => (
              <div key={video.id}>{video.channelTitle}</div>
            ))}
          </div>
          <CantentBox>
            <Thumbnail>이미지 들어갈 공간</Thumbnail>
            <LectureWrap>
              <LectureTitle>LectureTitle</LectureTitle>
              <LectureContent>
                LectureContent LectureContent LectureContent LectureContent
                LectureContent LectureContent LectureContent LectureContent
                LectureContent LectureContent LectureContent LectureContent
                LectureContent LectureContent LectureContent LectureContent
                LectureContent LectureContent LectureContent LectureContent
                LectureContent LectureContent LectureContent LectureContent
              </LectureContent>
            </LectureWrap>
            <Lecturer>나상욱 강사</Lecturer>
            <LectureDate>2023.01.01</LectureDate>
          </CantentBox>
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
const Thumbnail = styled.div`
  width: 100%;
  padding-bottom: 50%;
  background-color: beige;
  box-shadow: 0 10px 4px -4px #e3e3e3;
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
  padding-right: 10px;
  font-size: 10px;
  font-weight: bold;
  border-right: 1px solid;
`;

//* 강의 날짜
const LectureDate = styled.span`
  font-size: 10px;
  font-weight: bold;
`;
