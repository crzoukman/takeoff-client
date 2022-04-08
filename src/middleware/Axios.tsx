import { FC } from "react";
import axios, { AxiosError } from "axios";
import config from "config";
import { getCookie } from "utils/getCookie";
import { getUserDataFromLS } from "utils/getUserDataFromLS";
import { useNavigate } from 'react-router-dom';
import { deleteUserDataFromLS } from "utils/deleteUserDataFromLS";
import { useTypedDispatch } from "redux/hooks/useTypedDispatch";
import { setIsAuth } from 'redux/slices/main.slice';

const Axios: FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  axios.interceptors.response.use(
    function (response) { return response; },
    async function (error) {
      if (error.response.status === 403) {
        const userData = JSON.parse(getUserDataFromLS() as string);
        const token = getCookie('refreshToken' + userData.id);

        try {
          const newToken = await axios.get(config.BASE_URL + '/api/refresh', {
            headers: {
              'x-refresh': `${token}`
            }
          });

          document.cookie = `accessToken${userData.id}=${newToken.data.accessToken}`;
          return { status: 403 };
        } catch (e) {
          if (e instanceof Error) {
            const error2 = e as AxiosError;
            if (error2.response?.status === 401) {
              deleteUserDataFromLS();
              dispatch(setIsAuth(false));
              navigate('/login');
            }
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return (
    <></>
  );
};

export default Axios;