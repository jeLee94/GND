import styled from "styled-components";
import Button from "../components/button/LogoutButton";
import ToggleButton from "../components/button/ToggleButton";
import { useParams } from "react-router-dom";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const param = useParams<string>();
  const [data, setData] = useState<any>();

  const test = async () => {
    const docRef = doc(dbService, "CLASS", param.id as string);
    const docSnap = await getDoc(docRef);
    const ob = docSnap.data();
    return ob as any;
  };

  // promise 데이터 리스트로 변환
  const promise = test();
  const get = async () => {
    await promise.then((data) => {
      setData(data);
    });
  };

  useEffect(() => {
    get();
    console.log(data);
  }, []);

  return (
    <>
      <Main>
        <ThumbNailImg src={data?.thumbnail[0]} />
        <LectureTitle>{data?.title}</LectureTitle>
        <LectureCotents>{data?.description}</LectureCotents>
        <LectureListLogoAndToggle>
          <LectureList>강의 목록</LectureList>

          <ToggleButton />
        </LectureListLogoAndToggle>
        <VideoList>
          {data?.videotitle?.map((vTitle: any, idx: number) => {
            return (
              <OneVideo>
                <Link to={`/lecture/${data?.videoId[idx]}`}>
                  {" "}
                  <div>{vTitle}</div>
                </Link>
              </OneVideo>
            );
          })}
        </VideoList>
      </Main>
    </>
  );
}

export default App;

const Main = styled.div`
  margin-top: 100px;
`;
//임시로

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

const ThumbNailImg = styled.img`
  width: 700px;
  height: 500px;
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
  width: 700px;
  margin: auto;
  height: 20px;
  margin-bottom: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
const LectureList = styled.div``;
const VideoList = styled.div`
  width: 700px;
  margin: auto;
  margin-top: 10px;
`;

const OneVideo = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;
