import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getDoc, updateDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FaMountain } from 'react-icons/fa';
import CommentItem from 'components/detail/Comments/CommentItem';
import profileImg from '../../assets/profileImg.png';
import { useSelector } from 'react-redux';

const MyPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [nickName, setNickname] = useState('');
  const [newNickName, setNewNickname] = useState('');
  const [activeButton, setActiveButton] = useState();
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [checkBox, setCheckBox] = useState([]);

  // 작성한 댓글 목록
  const currentUser = auth.currentUser;
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    const loadUserComments = async () => {
      try {
        const userIdQuery = query(collection(db, 'comments'), where('userId', '==', currentUser.uid));
        const userIdSnapshot = await getDocs(userIdQuery);
        const userCommentsList = await userIdSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        // 댓글 내림차순 정렬
        const sortedUserComments = userCommentsList.sort((a, b) => b.timestamp - a.timestamp);

        setUserComments(sortedUserComments);
      } catch (error) {
        console.error('Error fetching user comments: ', error);
      }
    };

    loadUserComments();
  }, [currentUser.uid]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const userBookmarkRef = doc(db, 'bookmarks', currentUser.uid);
        const userBookmarkDoc = await getDoc(userBookmarkRef);
        if (userBookmarkDoc.exists()) {
          setBookmarkedPosts(userBookmarkDoc.data().posts);
        }
      } catch (error) {
        console.error('Error fetching bookmarks: ', error);
      }
    };
    loadBookmarks();
  }, [currentUser.uid]);

  const mountains = useSelector((state) => state.mountains);

  useEffect(() => {
    const loadCompleted = async () => {
      try {
        const userCheckBoxkRef = doc(db, 'completed', currentUser.uid);
        const userCheckBoxDoc = await getDoc(userCheckBoxkRef);
        if (userCheckBoxDoc.exists()) {
          setCheckBox(userCheckBoxDoc.data().posts);
        }
      } catch (error) {
        console.error('Error fetching bookmarks: ', error);
      }
    };
    loadCompleted();
  }, [currentUser.uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const userDocData = await getDoc(userDoc);
        if (userDocData.exists()) {
          const userData = userDocData.data();
          // profileImage가 없는 경우 기본 이미지 설정
          setImageUrl(userData.profileImage || profileImg);
          setNickname(userData.nickname);
        }
      } else {
        console.log('로그인한 계정 없음.');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // 프로필 이미지 업로드
  const handleProfileImageUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          setImageUrl(downloadURL);
          const user = auth.currentUser;
          const userDoc = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDoc);
          if (!docSnap.exists()) {
            await setDoc(userDoc, { profileImage: downloadURL });
          } else {
            await updateDoc(userDoc, { profileImage: downloadURL });
          }
          alert('이미지가 변경되었습니다.');
          event.target.value = null;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 닉네임 업데이트
  const handleNicknameChange = async () => {
    if (!newNickName.trim()) {
      alert('변경할 닉네임을 입력해주세요');
      return;
    }

    // 변경하는 닉네임이 기존 닉네임이랑 동일할시
    if (newNickName === nickName) {
      alert('다른 닉네임을 입력해주세요.');
      return;
    }

    const user = auth.currentUser;
    const userDoc = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDoc, { nickname: newNickName });
      setNickname(newNickName);
      setNewNickname('');
      alert('닉네임이 변경되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StContainer>
      <StMenu>
        <StProfile src={imageUrl} alt="프로필 사진" onClick={() => setActiveButton('')}/>
        <StprofileNickName onClick={() => setActiveButton('')}>
          {nickName}님
        </StprofileNickName>
        <StButtons>
          <StBtn active={activeButton === '내 정보 수정'} onClick={() => setActiveButton('내 정보 수정')}>
            <span>내 정보 수정</span>
          </StBtn>
          <StBtn active={activeButton === '북마크한 명산'} onClick={() => setActiveButton('북마크한 명산')}>
            <span>북마크한 명산</span>
          </StBtn>
          <StBtn active={activeButton === '가보았던 명산'} onClick={() => setActiveButton('가보았던 명산')}>
            <span>가보았던 명산</span>
          </StBtn>
          <StBtn active={activeButton === '작성한 댓글'} onClick={() => setActiveButton('작성한 댓글')}>
            <span>작성한 댓글</span>
          </StBtn>
        </StButtons>
      </StMenu>
      <StContent>
        {activeButton === '내 정보 수정' ? (
          <>
            <StTitle>PROFILE</StTitle>
            <StEditBox>
              <StProfileBox>
                <StImage src={imageUrl} alt="프로필 사진" />
              </StProfileBox>
              <StProfileNickNameEditBox>
                <StContext>프로필 이미지 변경</StContext>
                <StFileInput type="file" id="file" onChange={handleProfileImageUpload} style={{ display: 'none' }} />
                <StFileInputLabel htmlFor="file">파일 선택</StFileInputLabel>

                <StContext>닉네임 변경</StContext>
                <StEditNickName>{nickName}</StEditNickName>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNicknameChange();
                  }}
                >
                  <StInputNickName
                    type="text"
                    value={newNickName}
                    onChange={(e) => setNewNickname(e.target.value)}
                    placeholder="변경할 닉네임을 입력해주세요"
                  />
                  <StInputButton type="submit">변경</StInputButton>
                </form>
              </StProfileNickNameEditBox>
            </StEditBox>
          </>
        ) : activeButton === '북마크한 명산' ? (
          <div>
            {activeButton === '북마크한 명산' && (
              <StBookmarkContainer>
                {bookmarkedPosts.map((postId) => {
                  const mountain = mountains.find((mountain) => mountain.명산_이름 === postId);
                  if (!mountain) {
                    return null;
                  }
                  return (
                    <StBookmarkBox key={postId}>
                      <StMountain>⛰️{postId}<Link to={`/detail/${postId}`}><StMountainBotton>상세정보</StMountainBotton></Link></StMountain>
                      <StMountainInformation><StSpan>ㅤ고ㅤ도ㅤ</StSpan> {mountain.명산_높이}m</StMountainInformation>
                      <StMountainInformation><StSpan>ㅤ난이도ㅤ</StSpan> {mountain.난이도}</StMountainInformation>
                      <StMountainInformation><StSpan>ㅤ소재지ㅤ</StSpan> {mountain.명산_소재지}</StMountainInformation>
                    </StBookmarkBox>
                  );
                })}
              </StBookmarkContainer>
            )}
          </div>
        ) : activeButton === '가보았던 명산' ? (
          <div>
            {activeButton === '가보았던 명산' && (
              <StBookmarkContainer>
                {checkBox.map((postId) => {
                  const mountain = mountains.find((mountain) => mountain.명산_이름 === postId);
                  if (!mountain) {
                    return null;
                  }
                  return (
                    <StBookmarkBox key={postId}>
                      <StMountain>⛰️{postId}<StMountainBotton>상세정보</StMountainBotton></StMountain>
                      <StMountainInformation><StSpan>ㅤ고ㅤ도ㅤ</StSpan> {mountain.명산_높이}m</StMountainInformation>
                      <StMountainInformation><StSpan>ㅤ난이도ㅤ</StSpan> {mountain.난이도}</StMountainInformation>
                      <StMountainInformation><StSpan>ㅤ소재지ㅤ</StSpan> {mountain.명산_소재지}</StMountainInformation>
                    </StBookmarkBox>
                  );
                })}
              </StBookmarkContainer>
            )}
          </div>
        ) : activeButton === '작성한 댓글' ? (
          <StCommentContainer>
            <StCommentList>
              {userComments.map((userComment, index) => (
                <React.Fragment key={userComment.id}>
                  <StCommentLink to={`/detail/${userComment.mountainName}`}>
                    <FaMountain />
                    <p>{userComment.mountainName}</p>
                  </StCommentLink>
                  <CommentItem
                    currentUser={currentUser}
                    comments={userComments}
                    setComments={setUserComments}
                    comment={userComment}
                    index={index}
                  />
                  <hr />
                </React.Fragment>
              ))}
            </StCommentList>
          </StCommentContainer>
        ) : (
          <StProfilebox>
            <StTitle>MYPAGE</StTitle>
            <StImage src={imageUrl} alt="프로필 사진" />
            <StNickName>{nickName}</StNickName>
          </StProfilebox>
        )}
      </StContent>
    </StContainer>
  );
};

const StContainer = styled.div`
  display: flex;
  margin-top: 30px;
  background-color: white;
`;

// Menu
const StMenu = styled.div`
  width: 20%;
  height: 480px;
  text-align: center;
  justify-content: center;
  margin-top: 20px;
  margin-left: 20px;
`;

// Menu : 프로필 이미지
const StProfile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 50px;
  margin-bottom: 10px;
  cursor: pointer;
`;

// Menu : 현재 로그인한 계정의 닉네임
const StprofileNickName = styled.p`
  font-weight: bold;
  cursor: pointer;
`;

// Menu buttons
const StButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 250px;
  margin-top: 10px;
`;

// Menu : 각 버튼 css
const StBtn = styled.button`
  width: 130px;
  height: 40px;
  margin: 0px auto;
  background-color: transparent;
  border: none;
  position: relative;
  border-radius: 5px;
  font-weight: bold;
  color: #6d5f52;
  font-size: 15px;

  & span {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: ${(props) => (props.active ? '100%' : '0')};
      transform: ${(props) => (props.active ? 'translateX(-50%)' : 'translateX(0)')};
      border-bottom: 3px solid ${(props) => (props.active ? 'var(--sub-color2)' : 'var(--sub-color3)')};
      transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    }
  }

  &:hover span::after {
    width: 100%;
    transform: translateX(-50%);
  }
`;

// content
const StContent = styled.div`
  width: 80%;
  background-color: var(--sub-color3);
  text-align: center;
  margin: 20px 50px 0px 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  border: solid 2px;
  border-color: transparent;
`;

// content- mypage css
const StProfilebox = styled.div`
  margin-top: 70px;
`;

const StImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const StNickName = styled.p`
  font-size: 25px;
  color: #7e7057;
  font-weight: bold;
`;

const StEditBox = styled.div`
  display: flex;
`;

// content-내 정보 수정 : 타이틀
const StTitle = styled.p`
  font-size: 30px;
  margin-top: 40px;
  font-weight: bold;
  color: #476442; //#476442
`;

// content- 내 정보 수정 : profile 이미지
const StProfileBox = styled.div`
  margin: 50px auto;
  width: 33%;
`;

// content- 내 정보 수정 : 이미지, 닉네임 변경 위치
const StProfileNickNameEditBox = styled.div`
  margin: auto auto;
  width: 50%;
  height: 300px;
  padding-top: 40px;
  background-color: #ffffff6f;
  border-radius: 10px;
`;

// content- 세부 타이틀 css
const StContext = styled.p`
  color: #3a3a3a;
  font-size: 20px;
  font-weight: bold;
`;

// content-내 정보 수정 : 파일 선택
const StFileInputLabel = styled.label`
  display: inline-block;
  padding: 0.5em 1.5em;
  margin-top: 10px;
  margin-bottom: 30px;
  color: #000000;
  background-color: #b8c9b56c;
  border-color: #c9bfb56c;
  border-radius: 10px;
  text-align: center;
  transition: background-color 0.2s ease;
  box-shadow: 1.5px 1.5px 1px #5d645c;
  cursor: pointer;
  &:hover {
    background-color: var(--sub-color3);
  }
`;
const StFileInput = styled.input`
  display: none;
`;

// content-내 정보 수정 : 닉네임
const StEditNickName = styled.p`
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #7e7057;
  font-weight: bold;
`;

// content-내 정보 수정 : 닉네임 변경 input 창
const StInputNickName = styled.input`
  width: 200px;
  height: 40px;
  border-color: #ffffff6d;
  border-radius: 10px;
  background-color: #e2e2e2f4;
`;

// content-내 정보 수정 : 닉네임 변경 버튼
const StInputButton = styled.button`
  width: 100px;
  height: 40px;
  margin-left: 5px;
  border-radius: 10px;
  border-color: #b8c9b56c;
  background-color: #b8c9b56c;
  &:hover {
    background-color: var(--sub-color3);
  }
`;

// 작성한 댓글 스타일 컴포넌트
const StCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  user-select: none;
`;

const StCommentLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0px 20px;
  margin: 10px 0px -30px 0px;
  font-size: 22px;

  & p {
    font-size: 20px;
    font-weight: 600;
  }

  & svg {
    color: var(--main-color);
  }
`;

const StCommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  width: 100%;

  & hr {
    width: 100%;
    border: none;
    border-top: 1px solid darkgray;
    margin-top: -5px;
  }
`;
const StBookmarkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;
const StBookmarkBox = styled.div`
  background-color: #dce7db;
  justify-content: center;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  height: 130px;
  margin: 20px;
  border-radius: 10px;
  user-select: none;
  box-shadow: 0px 0px 3px #163020;
  padding: 10px;
`;
const StMountain = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-top: 5px;
`;
const StMountainInformation = styled.p`
  margin-left: 30px;
  margin-bottom: 3px;
`;
const StMountainBotton = styled.button`
  border: none;
  user-select: none;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 20px;
  box-shadow: 0.5px 0.5px 2px black;
`;
const StSpan = styled.span`
  font-weight: 600;
  color: #163020;
`;
export default MyPage;
