import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from "redux/hooks/useTypedDispatch";
import { useTypedSelector } from "redux/hooks/useTypedSelector";
import { setIsAuth } from "redux/slices/main.slice";
import { getUserDataFromLS } from "utils/getUserDataFromLS";

const useIsAuth = () => {
  const { isAuth } = useTypedSelector(state => state.main);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserDataFromLS();

    if (user) {
      dispatch(setIsAuth(true));
      navigate('/contacts');
    };

    if (!user) {
      dispatch(setIsAuth(false));
      navigate('/login');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuth;
}

export default useIsAuth;