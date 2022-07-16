import React from 'react';
import styled from 'styled-components';
import { AuthBackground } from 'src/components/authPage/authBackground/AuthBackground';
import AuthBox from 'src/components/authPage/AuthBox';
import { Header } from 'src/components/common/header/Header';

const AuthNickname = () => {
  return (
    <AuthPageWrapper>
      <Header />
      <AuthBackground />
      <AuthBox authStep="nickname" />
    </AuthPageWrapper>
  );
};

export default AuthNickname;
const AuthPageWrapper = styled.div`
  padding-top: 120px;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
