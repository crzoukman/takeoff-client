import { FC, useState } from 'react'
import { TextStyled, WrapperStyled } from './Registration.styled';
import { errorMsgs } from './config';
import Errors from 'components/Errors';
import { useNavigate } from 'react-router-dom';
import RegForm from 'components/RegForm';

const Registration: FC = () => {
  const [isError, setIsError] = useState<boolean | null>(null);
  const [errorCode, setErrorCode] = useState<null | number>(null);
  const navigate = useNavigate();

  return (
    <WrapperStyled>
      {isError !== false && (
        <RegForm
          setIsError={setIsError}
          setErrorCode={setErrorCode}
        />
      )}

      {isError !== false && (
        <TextStyled>
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </TextStyled>
      )}

      <div style={{ marginTop: '20px' }}>
        <Errors
          errorCode={errorCode}
          errorMsgs={errorMsgs}
          isError={isError}
        />
      </div>
    </WrapperStyled>
  );
};

export default Registration;