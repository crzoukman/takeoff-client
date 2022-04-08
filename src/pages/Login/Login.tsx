import { FC, useState } from 'react'
import { TextStyled, WrapperStyled } from './Login.styled';
import { useNavigate } from 'react-router-dom';
import LoginForm from 'components/LoginForm';
import Errors from 'components/Errors';
import { errorMsgs } from './config';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

const Login: FC = () => {
  const [isError, setIsError] = useState<boolean | null>(null);
  const [errorCode, setErrorCode] = useState<null | number>(null);
  const navigate = useNavigate();
  const { isAuth } = useTypedSelector(state => state.main);

  const redirectHandler = () => {
    navigate('/registration');
  };

  return (
    <WrapperStyled>
      {!isAuth && (
        <div>
          <LoginForm
            setIsError={setIsError}
            setErrorCode={setErrorCode}
          />

          <TextStyled>
            Don't have an account?
            <span onClick={redirectHandler}>Sign Up!</span>
          </TextStyled>
        </div>
      )}

      <div>
        <Errors
          errorCode={errorCode}
          errorMsgs={errorMsgs}
          isError={isError}
        />
      </div>
    </WrapperStyled>
  );
};

export default Login;