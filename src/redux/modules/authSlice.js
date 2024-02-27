import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// 비동기 액션 (로그인 상태 체크)
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { dispatch }) => {
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인 상태이면 user 정보를 전달하여 로그인 액션을 디스패치
        const { email, displayName: nickname } = user;
        dispatch(login({ email, nickname }));
      } else {
        // 로그아웃 상태이면 로그아웃 액션을 디스패치
        dispatch(logout());
      }
      resolve();
    });
    return unsubscribe;
  });
});

// Slice 생성
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    email: "",
    nickname: "",
    checked: false,
  },
  reducers: {
    login: (state, action) => {
      const { email, nickname } = action.payload;
      state.isLogin = true;
      state.email = email;
      state.nickname = nickname;
      state.checked = true;
    },
    logout: (state) => {
      state.isLogin = false;
      state.email = "";
      state.nickname = "";
      state.checked = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
