//유튜브 API 활용한 강의 페이지

import styled from 'styled-components';
import ReactPlayer from 'react-player';

const LecturePage = () => {
  return (
    <Container>
      <LectureHeader>
        <LectureTitle>혼자서도 마스터하는 React</LectureTitle>
        <BackButton>Back to Course</BackButton>
      </LectureHeader>
      <ReactPlayer
        url={
          'https://www.youtube.com/watch?v=t3M6toIflyQ&list=PLv2d7VI9OotSn1ThdDeqvBx8QuRSd01qv&index=1'
        }
        width='900px'
        height='510px'
        muted={true}
        controls={true}
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
