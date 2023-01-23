import styled from 'styled-components';
import Button from '../components/button/LogoutButton';
import ToggleButton from '../components/button/ToggleButton';
function App() {
  return (
    <>
      <Main>
        <Header>
          <HeaderGNDLogo>GND</HeaderGNDLogo>
          <HeaderEmailLogo>testEmail@naver.com</HeaderEmailLogo>
          <Button>Log out</Button>
        </Header>
        <ThumbNailImg>강의 썸네일 이미지</ThumbNailImg>
        <LectureTitle>과정 제목</LectureTitle>
        <LectureCotents>강의 내용</LectureCotents>
        <LectureListLogoAndToggle>
          <LectureList>강의 목록</LectureList>
          <ToggleButton />
        </LectureListLogoAndToggle>
      </Main>
    </>
  );
}

export default App;

const Main = styled.div``;
const Header = styled.div`
  width: 100%;
  height: 33px;
  background-color: #5f9c92;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderGNDLogo = styled.div`
  margin-left: 20px;
`;
const HeaderEmailLogo = styled.div`
  margin-left: 900px;
`;

const ThumbNailImg = styled.div`
  width: 700px;
  height: 250px;
  margin: auto;
  margin-top: 50px;
  background-color: gray;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const LectureTitle = styled.div`
  width: 700px;
  margin: auto;
  padding: 10px;
  font-weight: bold;
  font-size: larger;
`;
const LectureCotents = styled.div`
  background-color: gray;
  width: 700px;
  margin: auto;
  height: 100px;
  margin-bottom: 50px;
`;
const LectureListLogoAndToggle = styled.div`
  width: 700px;
  margin: auto;
  height: 40px;
  border-top: 5px solid #3b615b;
  border-bottom: 5px solid #3b615b;
  display: flex;
  align-items: center;
  justify-items: center;
`;
const LectureList = styled.div`
  background-color: red;
`;
