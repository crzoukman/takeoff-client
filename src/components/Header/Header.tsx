import { FC, useEffect, useState } from "react";
import { LogoutOutlined } from '@ant-design/icons';
import { getUserDataFromLS } from 'utils/getUserDataFromLS';
import { useTypedSelector } from "redux/hooks/useTypedSelector";
import { useTypedDispatch } from "redux/hooks/useTypedDispatch";
import { setIsAuth } from "redux/slices/main.slice";
import { deleteUserDataFromLS } from "utils/deleteUserDataFromLS";
import { useNavigate } from 'react-router-dom';
import { HeaderWrapperStyled, LoginWrapperStyled, LogoStyled, LogoWrapperStyled, WrapperStyled } from "./Header.styled";
import { ContainerStyled } from "App/App.styled";
import { ReactComponent as Logo } from 'assets/logo.svg'
import { logoStyles } from "./config";
import { Button } from "antd";

const Header: FC = () => {
  const [username, setUsername] = useState('');
  const { isAuth } = useTypedSelector(state => state.main);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserDataFromLS();

    if (user) setUsername(JSON.parse(user).username);
  }, [isAuth]);

  const logoutHandler = () => {
    dispatch(setIsAuth(false));
    deleteUserDataFromLS();
    navigate('/login');
  };

  return (
    <HeaderWrapperStyled>
      <ContainerStyled>
        <WrapperStyled>
          <LogoWrapperStyled>
            <Logo style={logoStyles} />
            <LogoStyled>Takeoff</LogoStyled>
          </LogoWrapperStyled>

          {isAuth && (
            <LoginWrapperStyled>
              <div>Welcome, {username}</div>

              <Button
                type="primary"
                icon={<LogoutOutlined />}
                size='large'
                shape="circle"
                onClick={logoutHandler}
              />
            </LoginWrapperStyled>
          )}
        </WrapperStyled>
      </ContainerStyled>
    </HeaderWrapperStyled>
  );
};

export default Header;