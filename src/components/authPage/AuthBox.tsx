import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from 'src/components/common/icon/Icon';
import Login from 'src/components/authPage/Login';
import NicknameSetting from 'src/components/authPage/NicknameSetting';

type AuthStep = 'login' | 'nickname';

interface Props {
  authStep: AuthStep;
}

const AuthBox: FC<Props> = ({ authStep }) => {
  return (
    <Wrapper>
      <AuthHeader>
        <Link href="/" passHref>
          <a>
            <Icon name="iconArrowLeft" size={36} />
          </a>
        </Link>
        {authStep === 'nickname' && <AuthHeaderTitle>닉네임 설정</AuthHeaderTitle>}
      </AuthHeader>
      {authStep === 'login' && <Login />}
      {authStep === 'nickname' && <NicknameSetting />}
    </Wrapper>
  );
};

export default AuthBox;

const Wrapper = styled.div`
  position: relative;

  width: 480px;
  height: 480px;

  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 4px 16px 40px rgba(168, 202, 207, 0.5);
  border-radius: 8px;

  z-index: 1;
`;

const AuthHeader = styled.div`
  margin: 16px 0 0 16px;

  display: flex;
  align-items: center;
`;

const AuthHeaderTitle = styled.h5`
  margin-left: 140px;

  font-weight: 700;
  font-size: 20px;
  line-height: 20px;

  color: ${({ theme }) => theme.fontColor.black};
`;
