//메인 페이지
import styled from 'styled-components';
import React, { useState } from 'react';
import Myslide from '../components/slide/Myslide';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePagination from '../hook/usePagination';
import DropDownList from '../components/dropdown/DropdownList';

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
  const [sortby, setSortby] = useState('title&desc');
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
    categorylist,
    sortby
  );

  // useEffect(() => {}, [category, sortby]);

  const list = [
    '제목 오름차순',
    '제목 내림차순',
    '채널명 오름차순',
    '채널명 내림차순',
  ];
  const ChooseOne = (e: React.MouseEvent) => {
    e.preventDefault();

    const target = e.currentTarget.textContent;
    if (target == '제목 오름차순') {
      setSortby('title&asc');
    } else if (target == '제목 내림차순') {
      setSortby('title&desc');
    } else if (target == '채널명 오름차순') {
      setSortby('channelTitle&asc');
    } else if (target == '채널명 내림차순') {
      setSortby('channelTitle&desc');
    }
  };
  return (
    <Container>
      {/* 검색 인풋창 */}
      <MainPageSlideBanner>
        <Myslide />
      </MainPageSlideBanner>

      <MainPageWrap>
        <Category>
          {categorylist.map((c: any, idx: number) => {
            return (
              <CategoryButton
                key={idx}
                onClick={() => {
                  setCategory(c);
                }}
              >
                {categoryName[idx]}
              </CategoryButton>
            );
          })}
        </Category>
        <WhereIsDropDown>
          <DropDownList list={list} ChooseOne={ChooseOne} />
        </WhereIsDropDown>
        <ContentWrap>
          {pageDatas?.map((data: any, idx: any) => {
            return (
              <Link
                key={idx}
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
                  <NoMoreFeeds>더 이상 불러올 영상이 없어요</NoMoreFeeds>
                )}
              </NoMoreFeeds>
              <div>{loadingMore}</div>
            </>
          )}
        </ContentWrap>
      </MainPageWrap>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100%;
  margin-top: 42px;
  position: absolute;
  left: 0;
`;
const NoMoreFeeds = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const MainPageWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 700px;
    padding: 1.2em;
  }
  @media screen and (max-width: 500px) {
    width: 500px;
    padding: 1.2em;
  }
`;

//* 배너
const MainPageSlideBanner = styled.div`
  background-color: #e3e3e3;
  align-items: center;
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

//* 카테고리
const Category = styled.div`
  width: 100%;
  height: 50px;
  padding-bottom: 50px;
  padding-top: 50px;
  justify-content: center;
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    margin-top: 40px;
    height: 120px;
    flex-wrap: wrap;
  }
`;

//* 카테고리 버튼
const CategoryButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 15px;
  border-color: transparent;
  margin-right: 10px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  :hover {
    color: white;
    background-color: #5f9c92;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
`;
const WhereIsDropDown = styled.div`
  display: flex;
  width: 1320px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 30px;
`;

//* 단일강의컨텐츠박스
const CantentBox = styled.div`
  max-width: 300px;
  height: 300px;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

//* 컨텐츠컨테이너
const ContentWrap = styled.div`
  width: 1320px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 40px;
  text-align: center;
  @media screen and (max-width: 768px) {
    width: 700px;
    padding: 1.2em;
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    width: 300px;
    padding: 1.2em;
  }
`;

//* 썸네일
const Thumbnail = styled.img`
  width: 300px;
  height: 70%;
  box-shadow: 10px 10px 20px -15px rgba(0, 0, 0, 0.75);
  display: flex;
  margin-bottom: 0.6rem;
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
const Lecturer = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
`;
