import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';

import { ROUTE } from 'src/route';
import { userSessionState } from 'src/stores/user';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';
import Icon from '../icon/Icon';

interface Props {
  bgColor?: keyof typeof theme.color;
}

export const Header: FC<Props> = ({ bgColor }) => {
  const router = useRouter();
  const [userSession, setUserSession] = useRecoilState(userSessionState);

  return (
    <HeaderWrapper bgColor={bgColor}>
      <Nav>
        <Icon
          name="iconTypoLogo"
          className="icon"
          onClick={() => {
            router.push(ROUTE.HOME);
          }}
        />
        <AuthMenu>
          {userSession ? (
            <HeaderButton>
              <a href="https://api.seeya-archive.com/kakao_logout">LOG OUT</a>
            </HeaderButton>
          ) : (
            <HeaderButton
              onClick={() => {
                router.push('/auth');
              }}>
              LOG IN
            </HeaderButton>
          )}
        </AuthMenu>
      </Nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header<Pick<Props, 'bgColor'>>`
  width: 100vw;
  height: 80px;

  display: flex;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  background-color: ${({ bgColor, theme }) => theme.color[bgColor ?? '#fff']};
  z-index: 999;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
  max-width: 1280px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;

  .icon {
    cursor: pointer;
  }
`;

const AuthMenu = styled.div`
  display: flex;
  align-items: center;

  gap: 15px;
`;

const HeaderButton = styled.button`
  padding: 2px 10px;
  border-radius: 132px;
  text-transform: uppercase;

  background-color: ${({ theme }) => theme.color.white};
  color: #376f77;
  border: 1px solid #688f95;

  a {
    color: #376f77;
  }
`;
