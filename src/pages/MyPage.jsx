import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const MyPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [nickName, setNickname] = useState("");
  const [newNickName, setNewNickname] = useState("");
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const userDocData = await getDoc(userDoc);
        if (userDocData.exists()) {
          const userData = userDocData.data();
          // profileImage가 없거나 빈 문자열인 경우 기본 이미지 URL을 설정
          setImageUrl(userData.profileImage || "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800");
          setNickname(userData.nickName);
        }
      } else {
        console.log('로그인한 계정 없음');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  

  const handleProfileImageUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.then(snapshot => {
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
    }).catch(error => {
      console.error('Upload failed:', error);
    });
  };
  
  // 닉네임 업데이트 하는 함수
  const handleNicknameChange = async () => {
    const user = auth.currentUser;
    const userDoc = doc(db, 'users', user.uid);
    try {
      // 닉네임 업데이트
      await updateDoc(userDoc, { nickName: newNickName });
      setNickname(newNickName);
      setNewNickname("");
      alert('닉네임이 변경되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  // 로그아웃 후 로그인 페이지 이동
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <StContainer>
        <StMenu>
          <StProfile src={imageUrl} alt="프로필 사진" />
          <StprofileNickName><strong>{nickName}</strong>님</StprofileNickName>
          <StButtons>
            <StBtn active={activeButton === '내 정보 수정'} onClick={() => setActiveButton('내 정보 수정')}>내 정보 수정</StBtn>
            <StBtn active={activeButton === '스크랩'} onClick={() => setActiveButton('스크랩')}>스크랩</StBtn>
            <StBtn active={activeButton === '완주한 등산코스'} onClick={() => setActiveButton('완주한 등산코스')}>완주한 등산코스</StBtn>
            <StBtn active={activeButton === '작성한 댓글'} onClick={() => setActiveButton('작성한 댓글')}>작성한 댓글</StBtn>
            <StLogoutBtn onClick={handleLogout}>로그아웃</StLogoutBtn>
          </StButtons>
        </StMenu>
        <StContent>
          {activeButton === '내 정보 수정' ? (
            <div>
              <StTitle>프로필 수정</StTitle>
              <StImage src={imageUrl} alt="프로필 사진" />
              <div>
                <StFileInput type="file" id="file" onChange={handleProfileImageUpload} style={{display: 'none'}} />
                <StFileInputLabel htmlFor="file">파일 선택</StFileInputLabel>
              </div>
              <StEditNickName>{nickName}</StEditNickName>
              <div>
                <StInputNickName type="text" value={newNickName} onChange={(e) => setNewNickname(e.target.value)} />
                <StInputButton onClick={handleNicknameChange}>닉네임 변경</StInputButton>
              </div>
            </div>
          ) : activeButton === '스크랩' ? (
            <div>
              {/* 스크랩 목록 */}
            </div>
          ) : activeButton === '완주한 등산코스' ? (
            <div>
              {/* 완주한 등산코스 */}
            </div>
          ) : activeButton === '작성한 댓글' ? (
            <div>
              {/* 작성한 댓글 */}
            </div>
          ) : (
            <StProfilebox>
              <StImage src={imageUrl} alt="프로필 사진" />
              <StNickName>{nickName}</StNickName>
            </StProfilebox>
          )}
        </StContent>
      </StContainer>
  )
}

const StContainer = styled.div`
  display: flex;
`;

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
  font-weight: bold;
`;

// Menu
const StMenu = styled.div`
  width: 20%;
  height: 500px;
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  border: solid 2px;
  border-color:var(--sub-color2);
`;

// Menu : 프로필 이미지
const StProfile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 30px;
  margin-bottom: 10px;
`;

// Menu : 현재 로그인한 계정의 닉네임
const StprofileNickName = styled.p`
  font-weight: bold;
`;

// Menu
const StButtons = styled.div`
  display: flex ;
  flex-direction: column;
  justify-content: center;
  height: 250px;
  margin-top: 20px;
`;

// Menu : 각 버튼 css
const StBtn = styled.button`
  width: 130px;
  height: 40px;
  margin: 0px auto;
  background-color: ${props => props.active ? 'var(--sub-color3)' : 'transparent'}; 
  border: none;
  position: relative;
  border-radius: 5px; 
  &:hover {
    background-color: var(--sub-color2); 
  }
  transition: background-color 0.1s;
`;

// Menu : 로그아웃 버튼
const StLogoutBtn = styled.button`
  width: 130px;
  height: 40px;
  margin: 40px auto;
  border-radius: 10px;
  border-color: gray;
`;

// content
const StContent = styled.div`
  width: 80%;
  // background-color: var(--sub-color3);
  text-align: center;
  margin: 0px 50px 0px 50px;
  
  border-radius: 10px;
  border: solid 2px;
  border-color: var(--sub-color2);
`;

// content-내 정보 수정 : 타이틀
const StTitle = styled.p`
  font-size: 30px;
  margin-top: 40px;
  font-weight: bold;
`;

// content-내 정보 수정 : 파일 선택
const StFileInputLabel = styled.label`
  display: inline-block;
  padding: 0.5em 1.5em;
  color: #fff;
  background-color: #949494;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #7e7e7e;
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
`;

// content-내 정보 수정 : 닉네임 변경 input 창
const StInputNickName = styled.input`
  width: 200px;
  height: 30px;

`;

// content-내 정보 수정 : 닉네임 변경 버튼
const StInputButton = styled.button`
  width: 100px;
  height: 40px;
  margin-left: 5px;
  border-radius: 10px;
  border-color: transparent;
  background-color: var(--sub-color2);
  &:hover {
    background-color: var(--sub-color1);
  }
`;

export default MyPage