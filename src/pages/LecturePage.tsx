//유튜브 API 활용한 강의 페이지

import styled from 'styled-components';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';

// import ReactPlayer from 'react-player';

const LecturePage = () => {
  const param = useParams<string>();
  console.log(param);

  return (
    <Container>
      <LectureHeader>
        <LectureTitle>혼자서도 마스터하는 React</LectureTitle>
        <BackButton>Back to Course</BackButton>
      </LectureHeader>
      <YouTube
        videoId={param?.id} //임시로 아이디값 하드코딩
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
  font-size: 1.5rem;
  font-weight: 600;
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
