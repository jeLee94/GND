//로그인 회원가입 화면
import { dbService } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const InsertData = () => {
  const [playlist, setPlaylist] = useState([]);
  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    axios
      .get(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=타입스크립트&order=relevance&key=AIzaSyBInemS4UAbNOJHtXpG0OW1neY96YqyGmQ'
        // 'localhost:3000/dashboard'
        //i.id.videoId
      )
      .then((res) => {
        console.log(res);
        setPlaylist(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });

    {
      playlist &&
        playlist.map((i: any, idx) => {
          console.log(i, idx);
          if (i?.id?.videoId) {
            addDoc(collection(dbService, 'CLASS'), {
              category: 'typescript',
              channelId: i?.snippet?.channelId,
              channelTitle: i?.snippet?.channelTitle,
              title: i?.snippet?.title,
              videoId: i?.id?.videoId,
              description: i?.snippet?.description,
              thumbnail: i?.snippet?.thumbnails.high.url,
            });
          }
        });
    }
    return null;
  };
  return (
    <div>
      <Button onClick={onClickHandler}>test</Button>
    </div>
  );
};

export default InsertData;

const Button = styled.button`
  width: 100px;
  height: 50px;
  margin: 100px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
