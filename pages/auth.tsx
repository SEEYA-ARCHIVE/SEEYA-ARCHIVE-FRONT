import React from 'react';
import { AuthBackground } from 'src/components/authPage/authBackground/AuthBackground';
import AuthBox from 'src/components/authPage/AuthBox';
import { Header } from 'src/components/common/header/Header';
import styled from 'styled-components';

const Auth = () => {
  return (
    <AuthPageWrapper>
      <Header />
      <AuthBackground />
      <AuthBox />
    </AuthPageWrapper>
  );
};

export default Auth;

const AuthPageWrapper = styled.div`
  padding-top: 120px;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
