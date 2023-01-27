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
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDate } from '../util/utils';
import CustomButton from '../components/button/CustomButton';

const Comment = (props: any) => {
  const { classID } = props;
  const [newComment, setNewComment] = useState('');
  const [modifiedComment, setModifiedComment] = useState('');
  const [prevComment, setPrevComment] = useState('');
  const [commentList, setCommentList] = useState<any[]>([]);
  const [isModifying, setIsModifying] = useState<any[]>([]);
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
          setNewComment('');
        })
        .catch(console.error);
    }
    viewComment();
  };

  //댓글 삭제
  const deleteComment = async (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      try {
        await deleteDoc(doc(dbService, 'comment', commentList[idx]?.id));
        setCommentList(commentList.splice(idx, 1));
      } catch (err) {
        console.error(err);
      }
    }
    viewComment();
  };

  //댓글 보기
  const viewComment = async () => {
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
      const tmp = new Array(commentObjList.length);
      setIsModifying(tmp.fill(false));
    }
  };

  //댓글 수정, 수정 취소
  const setModify = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();

    isModifying[idx] == true
      ? (isModifying[idx] = false)
      : (isModifying[idx] = true) &&
        setPrevComment(
          e.currentTarget.parentNode?.parentNode?.parentNode?.childNodes[1]
            .textContent as string
        );

    setIsModifying([...isModifying]);
  };

  //댓글 수정 완료 버튼 클릭시
  const ModifidComment = async (e: React.MouseEvent, idx: number) => {
    e.preventDefault();

    isModifying[idx] ? (isModifying[idx] = false) : (isModifying[idx] = true);
    setIsModifying([...isModifying]);
    const commentRef = doc(dbService, 'comment', commentList[idx]?.id);

    try {
      await updateDoc(commentRef, {
        comment: modifiedComment,
      });

      viewComment();
      setModifiedComment('');
      setPrevComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Content>
      {commentList?.map((comment: any, idx: any) => {
        return (
          <CommentContainer key={comment.id}>
            {/* 현재 user가 쓴 글인지 판별 */}
            {comment?.createID !== user?.uid ? (
              // 현재 유저가 쓴 글이 아니면 내용만 보여주고
              <CommentEmailWrap isModifying={false}>
                <CommentHeader>
                  <CreateInform>
                    {comment?.email} <CreatedAt>{comment?.createdAt}</CreatedAt>
                  </CreateInform>
                </CommentHeader>
                <Comments> {comment.comment}</Comments>
              </CommentEmailWrap>
            ) : (
              //현재 유저가 쓴 글이면 수정, 삭제 버튼까지 보여준다.
              <div>
                <CommentEmailWrap isModifying={isModifying[idx]}>
                  <CommentHeader>
                    <CreateInform>
                      {comment?.email}
                      <CreatedAt>{comment?.createdAt}</CreatedAt>
                    </CreateInform>
                    <ButtonWrap isModifying={isModifying[idx]}>
                      <CustomButton onClick={setModify} idx={idx}>
                        수정
                      </CustomButton>
                      <CustomButton onClick={deleteComment} idx={idx}>
                        삭제
                      </CustomButton>
                    </ButtonWrap>
                  </CommentHeader>

                  <Comments> {comment.comment}</Comments>
                </CommentEmailWrap>
                <ModifyInputWrap isModifying={isModifying[idx]}>
                  <InputComment
                    placeholder={prevComment}
                    onChange={(e) => {
                      setModifiedComment(e.target?.value);
                    }}
                    value={modifiedComment}
                  />

                  <CustomButton onClick={ModifidComment} idx={idx}>
                    완료
                  </CustomButton>
                  <CustomButton onClick={setModify} idx={idx}>
                    취소
                  </CustomButton>
                </ModifyInputWrap>
              </div>
            )}
          </CommentContainer>
        );
      })}
      {/* 입력영역 */}
      <InputWrap>
        <InputComment
          disabled={user ? false : true}
          //user있으면 이전 내용 없으면 로그인해주세요
          // placeholder={}
          // onClick={(e) => {
          // }}
          onChange={(e) => {
            if (user) {
              setNewComment(e.target.value);
            } else {
              alert('로그인 해주세요!');
            }
          }}
          value={newComment}
        />
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

const CommentHeader = styled.div`
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  background-color: #f1ecec;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding-left: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const CreateInform = styled.div`
  display: flex;
`;

const CreatedAt = styled.p`
  margin-left: 10px;
  font-weight: 100;
  font-size: 10px;
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
const ModifyInputWrap = styled.div<{ isModifying: boolean }>`
  display: ${(props) => (props.isModifying == false ? 'none' : 'flex')};
`;
const CommentEmailWrap = styled.div<{ isModifying: boolean }>`
  display: ${(props) => (props.isModifying == true ? 'none' : '')};
  /* width: 600px; */
`;
const ButtonWrap = styled.div<{ isModifying: boolean }>`
  display: ${(props) => (props.isModifying == true ? 'none' : 'flex')};

  /* flex-direction: column; */

  /* margin: auto; */
`;
