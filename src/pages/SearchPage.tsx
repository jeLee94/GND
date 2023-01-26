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
  // console.log('search', search);

  // FB에서 검색 영상 데이터 가져오기
  const searchVideoRequest = async (search: any) => {
    const q = query(
      collection(dbService, 'CLASS'),
      // where('channelTitle', '>=', text),
      where('title', '>=', search),
      where('title', '<=', search + '\uf8ff')
    );
    console.log('q', q);
    const querySnapshot = await getDocs(q);
    console.log('querySnapshot', querySnapshot);
    const searchItem: any[] = [];
    querySnapshot.docs.forEach((doc) => {
      console.log('doc', doc);
      searchItem.push({ id: doc.id, ...doc.data() });
    });
    console.log('searchItem', searchItem);
    setData(searchItem);

    return searchItem;
  };

  useEffect(() => {
    searchVideoRequest(search);
  }, [search]);

  return (
    <SearchResultContainer>
      <ContentWrap>
        <BackButtonWrapper>
          <Link to={`/`}>
            <BackButton>Back to Course</BackButton>
          </Link>
        </BackButtonWrapper>
        {Object.keys(data).map((i) => (
          <Link
            key={data[i]}
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
  margin-top: 5rem;
`;

//* 컨텐츠컨테이너
const ContentWrap = styled.div`
  width: 1320px;
  /* padding-bottom: 20px; */
  display: flex;
  flex-wrap: wrap;
  grid-gap: 30px;
  text-align: center;
`;

//* 단일강의컨텐츠박스
const CantentBox = styled.div`
  max-width: 300px;
  height: 300px;
  margin-top: 10px;
`;

//* 썸네일
const Thumbnail = styled.img`
  width: 300px;
  height: 70%;
  display: flex;
  box-shadow: 14px 14px 37px -25px rgba(0, 0, 0, 0.75);
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
  font-weight: 800;
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

//* 뒤로가기 버튼
const BackButtonWrapper = styled.div`
  width: 1320px;
  text-align: right;
  margin-right: 30px;
`;

const BackButton = styled.button`
  width: 150px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background-color: #76c2b6;
  color: #fff;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  :hover {
    background-color: #4aa496;
  }
`;
