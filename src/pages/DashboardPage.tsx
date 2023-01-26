import styled from 'styled-components';
import ToggleButton from '../components/button/ToggleButton';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from '../firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const param = useParams<string>();
  const [data, setData] = useState<any>();
  const [chagneButton, setChangeButton] = useState('minus');
  const [changeDisplay, setChangeDisplay] = useState('flex');

  const SnapDoc = async () => {
    const docRef = doc(dbService, 'CLASS', param.id as string);
    const docSnap = await getDoc(docRef);
    const ob = docSnap.data();
    return ob as any;
  };

  // promise 데이터 리스트로 변환
  const promise = SnapDoc();
  const get = async () => {
    await promise.then((data) => {
      setData(data);
    });
  };

  const onClickHandler = () => {
    changeDisplay == 'flex'
      ? setChangeDisplay('none')
      : setChangeDisplay('flex');

    chagneButton == 'minus'
      ? setChangeButton('plus')
      : setChangeButton('minus');
  };
  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Main>
        <ClassTitle>{data?.title}</ClassTitle>
        <Lecturer>{data?.channelTitle}</Lecturer>
        <ThumbNailImg src={data?.thumbnail[0]} />

        <LectureCotents>{data?.description}</LectureCotents>
        <ToggleHeader>
          <ToggleTitle>강의 목록</ToggleTitle>
          <ToggleButton onClick={onClickHandler} icon={chagneButton} />
        </ToggleHeader>
        <LectureList display={changeDisplay}>
          {data?.videotitle?.map((vTitle: any, idx: number) => {
            return (
              <VideoOne key={idx}>
                <Link
                  to={`/lecture/${data?.videoId[idx]}&${data?.videotitle[idx]}`}
                >
                  <LectureTitle>{vTitle}</LectureTitle>
                </Link>
              </VideoOne>
            );
          })}
        </LectureList>
        {/* 댓글영역 임시로 잡아놓음 */}
        <ToggleHeader>
          <ToggleTitle>댓글영역</ToggleTitle>
        </ToggleHeader>
        <LectureList
          display=''
          style={{ height: 500, backgroundColor: 'gray' }}
        >
          임시영역
        </LectureList>
      </Main>
    </>
  );
}

export default Dashboard;

const Main = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
`;

const ThumbNailImg = styled.img`
  height: 500px;
  background-color: gray;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const ClassTitle = styled.div`
  margin: 30px 0 5px 0;
  font-weight: bold;
  font-size: 30px;
`;

const Lecturer = styled.div`
  margin: 5px 0 30px 0;
`;
const LectureCotents = styled.div`
  /* background-color: gray; */
  width: 700px;
  margin: auto;
  height: auto;
  line-height: 35px;
  margin: 20px auto;
  text-overflow: ellipsis;
  /* overflow: hidden; */
  /* white-space: nowrap; */
`;
const ToggleHeader = styled.div`
  width: 700px;
  margin: 10px auto;
  height: 40px;
  border-top: 5px solid #3b615b;
  border-bottom: 5px solid #3b615b;
  display: flex;
  align-items: center;
  /* justify-items: center; */
  justify-content: space-between;
`;
const ToggleTitle = styled.div``;

const LectureList = styled.div<{ display: string }>`
  width: 700px;
  margin: 10px auto;
  display: ${(props) => props.display};
  flex-direction: column;
`;
const VideoOne = styled.div`
  /* background-color:  */
  width: 660px;
  padding: 20px;
  margin: 10px auto;
  box-shadow: 1px 1px 5px gray;
  a {
    text-decoration: none;
    color: black;
  }
  &:hover {
    background-color: #3b615b;
    a {
      color: white;
    }
  }
`;
const LectureTitle = styled.div``;
