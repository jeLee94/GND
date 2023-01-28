import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { dbService } from '../firebase';
import styled from 'styled-components';
// import fireDb from '../firebase';

const SearchPage = () => {
  const [data, setData] = useState<any>({});

  // URL의 파라미터값 확인
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let getQuery = useQuery();

  // 현재 URL에서 title의 값 가져오기
  let search = getQuery.get('title');

  // 검색 단어, DB의 카테고리와 매칭하기
  const changeSearchWord = (search: any) => {
    search = search.toLowerCase();
    if (search === '리액트') {
      search = 'react';
    } else if (search === '자바스크립트') {
      search = 'javascript';
    } else if (search === '타입스크립트') {
      search = 'typescript';
    } else if (search === '내배캠' || search === '내일배움캠프') {
      search = '내배캠';
    } else {
      search = search;
    }
    searchVideoRequest(search);
    return search;
  };

  // FB에서 검색 영상 데이터 가져오기
  const searchVideoRequest = async (search: any) => {
    const q = query(
      collection(dbService, 'CLASS'),
      where('category', '>=', search),
      where('category', '<=', search + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);

    const searchItem: any[] = [];
    querySnapshot.docs.forEach((doc) => {
      searchItem.push({ id: doc.id, ...doc.data() });
    });

    setData(searchItem);

    return searchItem;
  };
  // console.log(data);
  useEffect(() => {
    changeSearchWord(search);
    // searchVideoRequest(search);
  }, [search]);

  return (
    <SearchResultContainer>
      {data.length === 0 ? (
        '검색 결과가 없습니다'
      ) : (
        <ContentWrap>
          {Object.keys(data).map((i) => (
            <Link
              key={data[i].title}
              to={`/dashboard/${data[i]}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <CantentBox key={data[i].title}>
                <Thumbnail src={data[i]['thumbnail'][0]} />
                <LectureWrap>
                  <LectureTitle>{data[i].title}</LectureTitle>
                </LectureWrap>
                <Lecture>{data[i].channelTitle}</Lecture>
              </CantentBox>
            </Link>
          ))}
        </ContentWrap>
      )}
    </SearchResultContainer>
  );
};

export default SearchPage;

const SearchResultContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
  @media screen and (max-width: 768px) {
    width: 700px;
    padding: 1.2em;
  }
  @media screen and (max-width: 500px) {
    width: 500px;
    padding: 1.2em;
  }
`;

//* 컨텐츠컨테이너
const ContentWrap = styled.div`
  width: 1320px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 30px;
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

//* 단일강의컨텐츠박스
const CantentBox = styled.div`
  max-width: 300px;
  height: 300px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

//* 썸네일
const Thumbnail = styled.img`
  width: 300px;
  height: 70%;
  display: flex;
  box-shadow: 10px 10px 20px -15px rgba(0, 0, 0, 0.75);
`;

//* 강의내용 박스
const LectureWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

//* 강의 제목
const LectureTitle = styled.div`
  font-size: 1.2rem;
  margin-bottom: 6px;
  margin-top: 15px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; //보여질 줄 수
  -webkit-box-orient: vertical;
`;

//* 강의 주체자
const Lecture = styled.span`
  width: 50px;
  font-size: 0.9rem;
  font-weight: 500;
`;
