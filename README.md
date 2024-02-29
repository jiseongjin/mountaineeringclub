## 🖐🏻 프로젝트 명

### ⛰️ 한사랑 산악회

🔥 열정! 열정! 열정! 🔥

<br>

## 👩‍💻 프로젝트 소개

한사랑 산악회는 산림청이 선정한 100대 명산을 소개하는 사이트입니다.
등산을 좋아하시는 분이나 처음 해보시는 분들께 산에 대한 정보를 제공하며, 댓글을 통해 서로의 경험을 공유할 수 있습니다.

<br>

## 🖇️ 배포 링크

http://mountaineeringclub-xi.vercel.app

<br>

## 🎀 팀원 소개

|                  **지성진**                  |             **김현주**             |                 **이지은**                 |               **임혜린**                |                **장지영**                |
| :------------------------------------------: | :--------------------------------: | :----------------------------------------: | :-------------------------------------: | :--------------------------------------: |
| [@jiseongjin](https://github.com/jiseongjin) | [@HY965](https://github.com/HY965) | [@이지은](https://github.com/leejieun2023) | [@Hyerin](https://github.com/limhyerin) | [@JIYOUNG](https://github.com/Zzzzyoung) |
|                     팀장                     |                팀원                |                    팀원                    |                  팀원                   |                   팀원                   |
|                   Frontend                   |              Frontend              |                  Frontend                  |                Frontend                 |                 Frontend                 |

<br>

## ⏰ 개발 기간

2024.02.23 ~ 2024.02.28 (6일)

<br>

## 💻 개발 환경

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img alt="React" src ="https://img.shields.io/badge/React-444444.svg?&style=for-the-badge&logo=React&logoColor=react"/>

<br>

## 🗒️ 구현 항목

### 🔽 메인 페이지

- 검색 기능
  - 산 이름 검색 : 산의 이름에 검색어가 포함된 명산의 게시물들을 보여줍니다.
  - 지역 별 검색 : 사용자가 선택한 지역에 따라 게시물 목록을 필터링하여 보여줍니다.
  - 난이도 별 검색 : 사용자가 선택한 난이도에 따라 게시물 목록을 필터링하여 보여줍니다.
- 게시물 목록 표시 및 이동
  - 산에 대한 간략한 소개를 카드 형식으로 보여줍니다. 각 게시물을 클릭하면 해당 게시물의 상세 페이지로 이동합니다.
- 더 보기
  - 최초로 9개의 게시물을 카드 형식으로 보여주고 더 보기 버튼을 클릭하면 볼 수 있는 게시물의 수가 추가됩니다.
 
![image](https://github.com/jiseongjin/mountaineeringclub/assets/154482077/e05eec16-d0e4-4adf-bcba-bd400e0ec94e)

![image](https://github.com/jiseongjin/mountaineeringclub/assets/154482077/277efdff-4074-463c-80ee-c33c34c7b03b)

![image](https://github.com/jiseongjin/mountaineeringclub/assets/154482077/b4847bdf-3fe8-4cc6-a330-9d0cbfd4195b)

<br>

### 🔽 회원가입 페이지

- 소셜 회원가입
  - '구글 회원가입' 버튼을 클릭해Firebase Authentication에서 제공하는 Google를 사용하여 구글로 회원가입이 가능합니다.
- 이메일 회원가입
  - 이메일을 입력해 회원가입이 가능합니다.
- 유효성 검사
  - 이메일 유효성 검사 : 이메일 형식이 조건에 부합하는지 검사합니다.
  - 비밀번호 유효성 검사 : 비밀번호의 길이가 조건에 부합하는지 검사 후 비밀번호 재확인을 통해 처음 입력한 비밀번호에 대해 확인합니다.
  - 입력창 유효성 검사 : 빈 입력창이 있을 경우 경고창을 띄워줍니다.

![image](https://github.com/jiseongjin/mountaineeringclub/assets/154482077/b22455b0-3492-4f1d-be89-c4dd480399ff)

<br>

### 🔽 로그인 페이지

- 소셜 로그인
  - 사용자는 '구글 로그인' 버튼을 클릭해 해당 계정으로 로그인 할 수 있습니다.
- 이메일 로그인
  - 사용자는 이메일과 비밀번호를 입력하여 로그인 할 수 있습니다.
- 비밀번호 재설정
  - 이메일을 입력하지 않은 경우 경고 메시지를 보여줍니다.
  - 올바른 이메일을 입력한 경우 비밀번호 재설정 링크가 담긴 이메일을 전송하고 성공적으로 전송한 경우 알림 메시지를 보여줍니다.

![image](https://github.com/jiseongjin/mountaineeringclub/assets/154482077/c3e59195-df17-4514-a2fd-d7e695a6c2f2)

<br>

### 🔽 마이 페이지

- 개인 정보 수정
  - 프로필 이미지 수정 : 프로필 이미지 업로드를 통해 수정이 가능합니다.
  - 닉네임 수정 : 닉네입 수정이 가능합니다.
- 탭 선택
  - 특정 탭을 선택하여 해당하는 게시물을 볼 수 있습니다.
  - 북마크한 명산, 완주한 명산, 댓글 작성한 명산
- 게시물 목록 표시 및 이동
  - DB에서 필터링을 하여 선택한 탭에 해당하는 게시물을 표시합니다.
  - 각 게시물을 선택하면 해당 게시물의 상세 페이지로 이동합니다.
- 유효성 검사
  - 닉네임 유효성 검사 : 닉네임 변경 시, 변경 여부를 확인 후 변경되지 않았다면 알림창을 띄워줍니다.
  - 공백 유효성 검사 : 닉네임 입력 시, 공백 입력 여부를 확인합니다.

![image](https://github.com/jiseongjin/mountaineeringclub/assets/154482077/3d6401e0-afa9-4586-a740-e33d08e28644)


<br>

### 🔽 상세 페이지

- 명산 정보 제공
  - 산 이름, 위치, 산행 시간, 난이도 및 고도에 대한 정보를 제공하고 소개합니다.
  - 지도에서 산의 위치를 확인할 수 있습니다.
  - 산행 포인트를 통해 등산 코스를 선정하는 데 도움을 줍니다.
- 북마크 기능
  - 사용자가 북마크 버튼을 클릭하면 해당 게시물이 마이 페이지의 북마크한 명산 목록에 추가되어 자신이 북마크한 명산들의 목록을 볼 수 있습니다.
- 완주한 명산 체크 기능
  - 사용자가 체크 버튼을 클릭하면 해당 게시물이 마이 페이지의 가보았던 명산 목록에 추가되어 자신이 완주한 명산들의 목록을 볼 수 있습니다.
 
![image](https://github.com/jiseongjin/mountaineeringclub/assets/154482077/b1e14366-8628-4948-8664-66dea8612a9c)

- 댓글창
  - 댓글 등록을 통해 서로의 등산 경험을 공유합니다.
  - 정렬 기능 : 댓글 목록을 최신 순, 오래된 순으로 선택하여 볼 수 있습니다.
  - 수정 및 삭제 기능 : 사용자 본인이 작성한 댓글에 대하여 수정 및 삭제가 가능합니다.

![image](https://github.com/jiseongjin/mountaineeringclub/assets/154482077/d1856fe1-a07c-4ed2-998a-82429dd3b837)


<br>

## 🌟 트러블 슈팅

> 문제 1
- **문제점**<br>
사용자가 비밀번호나 이메일을 잘못 입력하거나 입력하지 않은 경우, 이를 검사하여 오류 메시지를 표시해야 하는 과정에서 어떤 유효성을 검사해야 하는지에 대한 문제가 발생했습니다.

- **원인**<br>
사용자의 입력이 요구 사항을 충족시키지 않을 때, 자릿수, 빈 칸, 이메일 형식 등을 검사해야 하지만, 이에 대한 명확한 기준이 부족합니다.

- **해결**<br>
사용자의 입력 유효성을 검사하기 위해 자릿수, 빈 칸 여부, 이메일 형식 여부 등을 체크하여 형식에 맞는 데이터를 입력할 수 있도록 조치했습니다. 유효성 검사가 실패할 경우, 사용자에게 어떤 요구 사항을 충족하지 않았는지를 메시지로 표시하여 명확한 안내를 제공합니다.

<br>

> 문제 2
- **문제점**<br>
초반에 AuthLayout의 로그인 상태를 확인하는 로직에서 isLogin 상태를 true로 초기화해 두어서 실제로 로그인 상태를 확인하지 못하는 문제가 발생했습니다. Firebase Authentication과 연동하여 현재 사용자의 로그인 상태를 반영하도록 수정했더니 적용이 되었습니다.

- **원인**<br>
isLogin 상태를 초기화할 때 Firebase Authentication의 로그인 상태와의 동기화가 이루어지지 않아서 실제 로그인 상태를 정확히 확인하지 못했습니다.

- **해결**<br>
useEffect 훅을 활용하여 컴포넌트가 마운트될 때 onAuthStateChanged를 구독하고, 컴포넌트가 언마운트될 때 구독을 해지하도록 구현했습니다. onAuthStateChanged는 로그인 상태가 변경될 때마다 호출되기 때문에 이를 통해 실시간으로 사용자의 로그인 상태를 확인할 수 있도록 조치했습니다. 이로써 초기화와 동시에 실제 로그인 상태를 반영하여 문제를 해결하였습니다.

```
const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  if (!isLogin) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to="/login" replace />;
  }
```
```
const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe(); // cleanup 함수
  }, []);
  if (loading) {
    return (
      <StLoading>
        <img src={Loading} alt="Loading" />
        잠시만 기다려 주세요.
      </StLoading>
    );
  }
  if (!isLoggedIn) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to="/login" replace />;
  }
```

<br>

> 문제 3
- **문제점**<br>
마이페이지에서 새로고침을 하면 로그인이 된 상태임에도 불구하고 "로그인이 필요한 페이지입니다." 경고창이 뜨고 로그인 페이지로 이동한 후 "이미 로그인 상태입니다." 경고창이 뜨는 문제가 발생했습니다.

- **원인**<br>
이 문제는 초기 로그인 상태를 체크하는 AuthLayout 컴포넌트에서 비동기적으로 사용자 정보를 가져오는 onAuthStateChanged 함수의 동작이 마이페이지가 렌더링되기 전에 완료되지 않아 발생한 것입니다. 이로 인해 초기에 로그인 상태를 올바르게 판단하지 못하여 로그인이 필요한 페이지로 이동하게 되었습니다.

- **해결**<br>
AuthLayout 컴포넌트에서 onAuthStateChanged 함수를 사용하여 사용자 정보를 가져올 때, 로딩 상태를 추가하여 해당 동작이 완료될 때까지 대기하도록 하였습니다. 이를 통해, 초기 로그인 상태를 정확하게 확인하고, 마이페이지에서 새로고침을 할 때에도 사용자 정보가 올바르게 유지되도록 수정하였습니다.
문제점

<br>

> 문제 4
- **문제점**<br>


- **원인**<br>


- **해결**<br>


<br>

