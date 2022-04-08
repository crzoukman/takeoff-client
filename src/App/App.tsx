import Header from 'components/Header';
import Axios from 'middleware/Axios';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Contacts, Login, Registration } from '../pages';
import { ContainerStyled } from './App.styled';
import useIsAuth from './hooks/useIsAuth';

const App: FC = () => {
  const isAuth = useIsAuth();

  return (
    <div>
      <Header />

      <ContainerStyled>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/contacts' element={<Contacts />} />
          {isAuth && <Route path="*" element={<Navigate to="contacts" replace />} />}
          {!isAuth && <Route path="*" element={<Navigate to="login" replace />} />}
        </Routes>
      </ContainerStyled>

      <Axios />
    </div>
  );
};

export default App;
