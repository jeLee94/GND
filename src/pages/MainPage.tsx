//메인 페이지
import styled from 'styled-components';
import React, { useState } from 'react';
import Myslide from '../components/slide/Myslide';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePagination from '../hook/usePagination';

const MainPage = () => {
  const categorylist = [
    'all',
    'react',
    'javascript',
    'typescript',
    'cs',
    '내배캠',
  ];
  const categoryName = [
    'All',
    'React',
    'Javascirpt',
    'Typescript',
    'CS전공지식',
    '내일배움캠프',
  ];
  const [category, setCategory] = useState('all');
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const INITIAL_FETCH_COUNT = 7;
  const {
    data: pageDatas,
    loadingMore,
    noMore,
  } = usePagination(
    'CLASS',
    INITIAL_FETCH_COUNT,
    target,
    category,
    categorylist
  );

  useEffect(() => {}, [category]);

  return (
    <>
      {/* 검색 인풋창 */}
      <MainPageSlideBanner>
        <Myslide />
      </MainPageSlideBanner>

      <MainPageWrap>
        <Category>
          {categorylist.map((c: any, idx: number) => {
            return (
              <CategoryBotton
                key={idx}
                onClick={() => {
                  setCategory(c);
                }}
              >
                {categoryName[idx]}
              </CategoryBotton>
            );
          })}
        </Category>
        <ContentWrap>
          {pageDatas?.map((data: any) => {
            return (
              <Link
                key={data.id}
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

          {pageDatas?.length > 0 && (
            <>
              <div ref={setTarget} />
              <NoMoreFeeds>
                {noMore && (
                  <NoMoreFeeds>더 이상 불러올 피드가 없어요</NoMoreFeeds>
                )}
              </NoMoreFeeds>
              <div>{loadingMore}</div>
            </>
          )}
        </ContentWrap>
      </MainPageWrap>
    </>
  );
};

export default MainPage;

const NoMoreFeeds = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const MainPageWrap = styled.div`
  width: 100;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

//* 배너
const MainPageSlideBanner = styled.div`
  margin-top: 30px;
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
  :hover {
    color: white;
    background-color: #5f9c92;
  }
`;

//* 단일강의컨텐츠박스
const CantentBox = styled.div`
  max-width: 300px;
  height: 300px;
  margin-top: 20px;
`;

//* 컨텐츠컨테이너
const ContentWrap = styled.div`
  width: 1320px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 40px;
  text-align: center;
`;

//* 썸네일
const Thumbnail = styled.img`
  width: 300px;
  height: 70%;
  box-shadow: 0 10px 4px -4px #e3e3e3;
  display: flex;
`;

//* 강의내용 박스
const LectureWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

//* 강의 제목
const LectureTitle = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; //보여질 줄 수
  -webkit-box-orient: vertical;
`;

//* 강의 주체자
const Lecturer = styled.span`
  width: 50px;
  margin: 10px 10px 0 10px;
  font-size: 15px;
  font-weight: bold;
`;
