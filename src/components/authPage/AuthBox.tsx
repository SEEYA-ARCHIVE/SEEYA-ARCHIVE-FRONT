import React from 'react';
import styled from 'styled-components';
import { Button } from '../common/button/Button';
import Icon from '../common/icon/Icon';
import { Img } from '../common/image/Img';

const AuthBox = () => {
  return (
    <Wrapper>
      <BackIcon name="iconArrowLeft" size={36} />
      <LoginWrapper>
        <Img name="HeartBubble" width={57} height={65} />
        <Title>
          <span className="mint bold">1초</span>만에 <span className="bold">로그인</span>하세요!
        </Title>
        <ButtonWrapper>
          <AuthButton bgColor="kakao" className="kakao">
            <Icon name="iconKakaoSymbol" /> 카카오 계정으로 로그인
          </AuthButton>
          <AuthButton bgColor="twitter" className="twitter">
            <Icon name="iconTwitterSymbol" /> 트위터 계정으로 로그인
          </AuthButton>
        </ButtonWrapper>
      </LoginWrapper>
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

const LoginWrapper = styled.div`
  margin-top: 94px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackIcon = styled(Icon)`
  position: absolute;

  top: 16px;
  left: 16px;
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

const AuthButton = styled(Button)`
  width: 100%;
  position: relative;
  border-radius: 6px;

  height: 54px;

  font-size: 16px;
  font-weight: 500;

  &.kakao {
    color: #191600;

    svg {
      position: absolute;
      top: 17px;
      left: 17px;
    }
  }

  &.twitter {
    svg {
      position: absolute;
      top: 15px;
      left: 16px;
    }
  }
`;
