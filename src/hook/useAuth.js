import { useSelector } from "react-redux";

const useAuth = () => {

    const isLogin = useSelector((state) => state.auth.isLogin);
    const checked = useSelector((state) => state.auth.checked);

  return { isLogin, checked };
}

export default useAuth;