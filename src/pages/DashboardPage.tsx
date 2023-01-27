import styled from 'styled-components';
import ToggleButton from '../components/button/ToggleButton';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from '../firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Comment from './comment';

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
        <ChannelName>{data?.channelTitle}</ChannelName>
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
        {/* 댓글영역  */}
        <ToggleHeader>
          <ToggleTitle>강의평</ToggleTitle>
        </ToggleHeader>
        <Comment classID={data?.playlistId ?? data?.videoId[0]} />
      </Main>
    </>
  );
}

export default Dashboard;

const Main = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  margin: 60px auto;
`;

const ThumbNailImg = styled.img`
  width: 700px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const ClassTitle = styled.div`
  margin: 30px 0 5px 0;
  font-weight: 900;
  font-size: 1.8rem;
`;

const ChannelName = styled.div`
  margin: 10px 0 20px 0;
  font-weight: 500;
  font-size: 1rem;
`;
const LectureCotents = styled.div`
  width: 700px;
  margin: auto;
  height: auto;
  font-size: 1rem;
  line-height: 32px;
  margin: 20px auto;
  text-overflow: ellipsis;
`;
const ToggleHeader = styled.div`
  width: 700px;
  margin: 10px auto;
  height: 40px;
  border-top: 2px solid #5f9c92;
  border-bottom: 2px solid #5f9c92;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;
const LectureList = styled.div<{ display: string }>`
  width: 700px;
  display: ${(props) => props.display};
  flex-direction: column;
`;
const VideoOne = styled.div`
  width: 700px;
  padding: 20px;
  margin: 7px auto;
  border: 1px solid #f1f6f6;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1rem;
  a {
    text-decoration: none;
    color: black;
  }
  &:hover {
    border: 1px solid #f8f9fa;
    background-color: #f8f9fa;
    box-shadow: 7px 7px 10px -10px rgba(0, 0, 0, 0.2);
    /* a {
      color: white;
    } */
  }
`;
const LectureTitle = styled.div``;
