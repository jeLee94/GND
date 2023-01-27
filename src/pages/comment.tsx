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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faEllipsis,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import MoreButton from '../components/button/MoreButton';
import { UserInform } from '../components/header/Header';

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

  const [chagneButton, setChangeButton] = useState('more');
  const [changeDisplay, setChangeDisplay] = useState('flex');

  const onClickHandler = () => {
    changeDisplay == 'flex'
      ? setChangeDisplay('none')
      : setChangeDisplay('flex');

    chagneButton == 'more' ? setChangeButton('') : setChangeButton('more');
  };

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
                  <CreateInform>{comment?.email}</CreateInform>
                  <CreatedAt>{comment?.createdAt}</CreatedAt>
                </CommentHeader>
                <Comments> {comment.comment}</Comments>
              </CommentEmailWrap>
            ) : (
              //현재 유저가 쓴 글이면 수정, 삭제 버튼까지 보여준다.
              <div>
                <CommentEmailWrap isModifying={isModifying[idx]}>
                  <CommentHeader>
                    <CreateInform>{comment?.email}</CreateInform>
                    <ButtonWrap isModifying={isModifying[idx]}>
                      <CreatedAt>{comment?.createdAt}</CreatedAt>
                      <MoreButton onClick={onClickHandler} />
                      <InnerButtonWrap display={changeDisplay}>
                        <ModifyButtonWrapper>
                          <CustomButton onClick={setModify} idx={idx}>
                            <EditIcon icon={faPenToSquare} />
                            수정
                          </CustomButton>
                          <CustomButton onClick={deleteComment} idx={idx}>
                            <DeleteIcon icon={faTrashCan} />
                            삭제
                          </CustomButton>
                        </ModifyButtonWrapper>
                      </InnerButtonWrap>
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
                  <CompleteAndCancleBtn>
                    <CustomButton onClick={ModifidComment} idx={idx}>
                      완료
                    </CustomButton>
                    <CustomButton onClick={setModify} idx={idx}>
                      취소
                    </CustomButton>
                  </CompleteAndCancleBtn>
                </ModifyInputWrap>
              </div>
            )}
          </CommentContainer>
        );
      })}
      {/* 입력영역 */}
      <InputTitle>댓글 작성</InputTitle>
      <InputWrap>
        <UserInform
          style={{ color: '#222222', fontWeight: '500', marginBottom: '10px' }}
        >
          {authService?.currentUser?.email ?? ''}
        </UserInform>
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
          placeholder='내용을 입력해주세요.'
        />

        <div style={{ width: '100%', textAlign: 'right', marginTop: '10px' }}>
          <CustomButton onClick={createComment}>
            <p style={{ fontWeight: '600', color: '#222222' }}>등록</p>
          </CustomButton>
        </div>
      </InputWrap>
    </Content>
  );
};
export default Comment;

const Content = styled.div``;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  border: 1px solid #f1f6f6;
  border-radius: 10px;
  position: relative;
`;

const CommentHeader = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  height: 30px;
  background-color: #f1f6f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 30px;
  padding-left: 15px;
  padding-right: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const CreateInform = styled.div`
  display: flex;
`;

const EditIcon = styled(FontAwesomeIcon)`
  width: 20px;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  width: 20px;
`;

const CreatedAt = styled.p`
  margin-right: 20px;
  font-weight: 200;
  font-size: 0.6rem;
`;
const Comments = styled.div`
  min-height: 60px;
  padding: 10px 5px;
  font-size: 15px;
  line-height: 25px;
`;

const InputTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;
const InputComment = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  outline: none;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Pretendard Variable';
`;
const ModifyInputWrap = styled.div<{ isModifying: boolean }>`
  display: ${(props) => (props.isModifying == false ? 'none' : 'flex')};
`;
const CommentEmailWrap = styled.div<{ isModifying: boolean }>`
  display: ${(props) => (props.isModifying == true ? 'none' : '')};
`;
const ButtonWrap = styled.div<{ isModifying: boolean }>`
  display: ${(props) => (props.isModifying == true ? 'none' : 'flex')};
`;

const ModifyButtonWrapper = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0px;
  top: 35px;
  border-radius: 10px;
  padding: 5px 0px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: 7px 7px 10px -10px rgba(0, 0, 0, 0.3);
`;

const InnerButtonWrap = styled.div<{ display: string }>`
  width: 0px;
  display: ${(props) => props.display};
`;

const CompleteAndCancleBtn = styled.div`
  width: 120px;
  text-align: right;
  padding: 20px;
  margin: auto;
`;
