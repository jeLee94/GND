//유튜브 API 활용한 강의 페이지

import styled from 'styled-components';
import YouTube from 'react-youtube';
import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

// import ReactPlayer from 'react-player';
const BackToCourse = (e: React.MouseEvent) => {
  e.preventDefault();
  window.history.back();
};

const LecturePage = () => {
  const location = useLocation();
  const param = useParams<string>();

  useEffect(() => {
    if (location.pathname.split('/')[1] === 'lecture') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);
  return (
    <Container>
      <LectureHeader>
        <LectureTitle>{param.title}</LectureTitle>
        <BackButton onClick={BackToCourse}>Back to Course</BackButton>
      </LectureHeader>
      <YouTube
        videoId={param.videoId}
        opts={{
          width: 900,
          height: 510,
        }}
      />
    </Container>
  );
};

export default LecturePage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LectureHeader = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const LectureTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  width: 150px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background-color: #76c2b6;
  color: #fff;
  cursor: pointer;
`;
