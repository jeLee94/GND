import { dbService, authService } from '../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDate } from '../util/utils';
import CustomButton from '../components/button/CustomButton';
const Comment = (props: any) => {
  const { classID } = props;
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState<any[]>([]);
  const user = authService?.currentUser;
  // todo: input창 제출 후 지우기
  // form으로 수정해서 엔터 가능하도록
  //수정기능 추가
  // createAt 활용
  useEffect(() => {
    viewComment();
  }, [classID]);

  //댓글 생성
  const createComment = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (newComment === '') {
      alert('내용을 입력하세요');
    } else {
      await addDoc(collection(dbService, 'comment'), {
        commentID: Date.now(),
        createdAt: getDate(),
        comment: newComment,
        createID: user?.uid,
        email: user?.email,
        classID: classID,
      })
        .then(() => {
          console.log('댓완료');
        })
        .catch(console.error);
    }
    viewComment();
  };

  const deleteComment = async (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      try {
        await deleteDoc(doc(dbService, 'comment', commentList[idx]?.id));
        setCommentList(commentList.splice(idx, 1));
        console.log('삭제완료!');
      } catch (err) {
        console.error(err);
      }
    }
    viewComment();
  };

  const viewComment = async () => {
    console.log('view!');

    //classID가 좀 늦게 호출돼서 if로 예외처리
    if (classID) {
      const q = query(
        collection(dbService, 'comment'),
        where('classID', '==', classID),
        orderBy('createdAt')
      );
      const querySnapshot = await getDocs(q);

      const commentObjList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCommentList(commentObjList);
    }
  };

  return (
    <Content>
      {commentList?.map((comment: any, idx: any) => {
        console.log(comment);
        return (
          <CommentContainer key={comment.id}>
            <CommentEmailWrap>
              <Email> {comment.email}</Email>
              <Comments> {comment.comment}</Comments>
            </CommentEmailWrap>
            <ButtonWrap>
              <CustomButton onClick={deleteComment} idx={idx}>
                수정
              </CustomButton>
              <CustomButton onClick={deleteComment} idx={idx}>
                삭제
              </CustomButton>
            </ButtonWrap>
          </CommentContainer>
        );
      })}
      <InputWrap>
        <InputComment
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        ></InputComment>
        <CustomButton onClick={createComment}>등록</CustomButton>
      </InputWrap>
    </Content>
  );
};
export default Comment;

const Content = styled.div``;
const CommentContainer = styled.div`
  /* border-bottom: 1px solid #3b615b40; */
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  /* justify-content: center; */
  /* align-items: center; */
  border: 1px solid #c0bebe;
  border-radius: 10px;
`;
const CommentEmailWrap = styled.div`
  /* width: 600px; */
`;
const ButtonWrap = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  margin: auto;
`;
const Email = styled.div`
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  background-color: #f1ecec;
  align-items: center;
  display: flex;
  padding-left: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const Comments = styled.div`
  min-height: 60px;
  padding: 10px 5px;

  font-size: 15px;
  line-height: 25px;
`;
const InputWrap = styled.div`
  display: flex;
`;
const InputComment = styled.textarea`
  width: 610px;
  height: 100px;
  font-family: 'Pretendard-standard';
`;
