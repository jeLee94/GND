//로그인 회원가입 화면
import { dbService } from '../../firebase';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const InsertData = () => {
  const [playlist, setPlaylist] = useState([]);
  const [videoItems, setvideoItems] = useState<any>([]);
  // let playlist: string[];
  const getPlaylistIdHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    axios
      .get(
        //단일 영상용
        'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=cs전공지식&order=relevance&type=video&key=AIzaSyBFGvK1hpr4U1u6BArtxPAwiUJ90Qt99x4'
        //플레이리스트용
        // 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=타입스크립트&order=relevance&type=playlist&key=AIzaSyBFGvK1hpr4U1u6BArtxPAwiUJ90Qt99x4'
      )
      .then((res) => {
        console.log('API요청 완료', res);
        setPlaylist(res.data.items);
      })
      .catch((err) => {
        console.log('API 요청 실패', err);
      });

    {
      playlist &&
        playlist.map((i: any, idx) => {
          console.log(i, idx);
          if (i?.id?.playlistId) {
            addDoc(collection(dbService, 'CLASS'), {
              category: 'cs',
              channelId: i?.snippet?.channelId,
              channelTitle: i?.snippet?.channelTitle,
              title: i?.snippet?.title,
              playlistId: i?.id?.playlistId,
              thumbnail: i?.snippet?.thumbnails.high.url,
            });
          } else if (i?.id?.videoId) {
            addDoc(collection(dbService, 'CLASS'), {
              category: 'cs',
              channelId: i?.snippet?.channelId,
              channelTitle: i?.snippet?.channelTitle,
              title: i?.snippet?.title,
              videoId: i?.id?.videoId,
              thumbnail: i?.snippet?.thumbnails.high.url,
            });
          }
        });
    }
    return null;
  };

  const getData = async () => {
    let list: object[] = [];
    const q = query(collection(dbService, 'CLASS'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      list.push(obj);
    });
    return list;
  };

  //promise 데이터 리스트로 변환
  const promise = getData();
  const [playlistIdList, setPlaylistIdList] = useState<any[]>([]);
  const getPlaylistId = async () => {
    await promise.then((data: any) => {
      setPlaylistIdList(data);
      // setPlaylistIdList(data.map((d: any) => d.playlistId));
    });
  };
  console.log('d', playlistIdList);

  const getVideoDataHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    let k = 0;
    while (k < playlistIdList.length) {
      setvideoItems([]);
      console.log('k', k);
      console.log(
        `playlistIdList[${k}].playlistId`,
        playlistIdList[k].playlistId
      );
      await axios
        .get(
          //플레이리스트 아이디를 통해 videoId가 있는 리스트 가져오기
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistIdList[k]?.playlistId}&key=AIzaSyBInemS4UAbNOJHtXpG0OW1neY96YqyGmQ`

          // 'https://www.googleapis.com/youtube/v3/search?part=snippet&&key=AIzaSyBInemS4UAbNOJHtXpG0OW1neY96YqyGmQ'
          // 'localhost:3000/dashboard'
          //i.id.videoId
        )
        .then((res) => {
          console.log('API요청 완료', k, res?.data?.items);
          res?.data?.items?.map((i: any) => {
            const docRef = doc(dbService, 'CLASS', playlistIdList[k].id);
            console.log('1 통과');
            if (playlistIdList[k]?.playlistId === i?.snippet?.playlistId) {
              console.log('2통과');
              updateDoc(docRef, {
                videotitle: arrayUnion(i?.snippet?.title),
                description: arrayUnion(i?.snippet?.description ?? '없음'),
                videoId: arrayUnion(i?.snippet?.resourceId?.videoId),
                thumbnail: arrayUnion(
                  i?.snippet?.thumbnails.high.url ?? '없음'
                ),
              });
            }
          });
        })
        .catch((err) => {
          console.log('API 요청 실패', err);
        });

      k++;
    }

    return null;
  };

  const videoUpdateDocHandler = async () => {
    let k = 0;
    while (k < playlistIdList.length) {
      const docRef = doc(dbService, 'CLASS', playlistIdList[k].id);
      console.log('p', playlist);
      console.log('p2', playlistIdList);
      playlist &&
        playlist.map((i: any) => {
          // if (playlistIdList[k]?.playlistId === i?.snippet?.playlistId) {
          //   updateDoc(docRef, {
          //     videotitle: arrayUnion(i?.snippet?.title),
          //     description: arrayUnion(i?.snippet?.description ?? '없음'),
          //     videoId: arrayUnion(i?.snippet?.resourceId?.videoId),
          //     thumbnail: arrayUnion(i?.snippet?.thumbnails.high.url ?? '없음'),
          //   });
          // }
        });
      k++;
    }
  };

  return (
    <div>
      <H2>개발자 전용 페이지 클릭주의!</H2>
      <Button onClick={getPlaylistIdHandler}>
        1.플레이리스트 ID 얻기 위한 API요청
      </Button>
      <Button onClick={getPlaylistId}>2.플레이리스트ID 리스트로 추출</Button>
      <Button onClick={getVideoDataHandler}>
        3.플레이리스트API요청하여 비디오 데이터 배열만들기
      </Button>
      <Button onClick={videoUpdateDocHandler}>
        4.단일 비디오일 경우 length=1인 리스트 만들기
      </Button>
    </div>
  );
};

export default InsertData;

const H2 = styled.h2`
  margin-top: 60px;
  text-align: center;
  color: red;
`;

const Button = styled.button`
  /* width: 100; */
  height: 50px;
  margin: 70px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
