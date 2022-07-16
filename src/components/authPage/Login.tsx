import React from 'react';
import styled from 'styled-components';
import { Img } from '../common/image/Img';
import { AuthButton } from './authButton/AuthButton';

const Login = () => {
  return (
    <LoginWrapper>
      <Img name="HeartBubble" width={57} height={65} />
      <Title>
        <span className="mint bold">1초</span>만에 <span className="bold">로그인</span>하세요!
      </Title>
      <ButtonWrapper>
        <AuthButton provider="kakao" />
      </ButtonWrapper>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  margin-top: 94px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 12px;

  font-size: 24px;
  line-height: 28px;

  > span {
    &.mint {
      color: ${({ theme }) => theme.fontColor.mint};
    }

    &.bold {
      font-weight: 700;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 36px;
  width: 360px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
