import { FC } from 'react';
import Icon from 'src/components/common/icon/Icon';
import * as icons from 'src/components/common/icon/iconPath';
import styled, { css } from 'styled-components';

type Provider = 'kakao' | 'twitter';

type OauthProvider = {
  [key in Provider]: {
    label: string;
    iconName: keyof typeof icons;
  };
};

interface Props {
  provider: Provider;
}

export const AuthButton: FC<Props> = ({ provider }) => {
  const oauthProvider: OauthProvider = {
    kakao: { label: '카카오', iconName: 'iconKakaoSymbol' },
    twitter: { label: '트위터', iconName: 'iconTwitterSymbol' },
  };
  return (
    <AuthButtonWrapper provider={provider}>
      <Icon name={oauthProvider[provider].iconName} />
      {oauthProvider[provider].label}로 계속하기
    </AuthButtonWrapper>
  );
};

const AuthButtonWrapper = styled.a<Props>`
  position: relative;
  width: 100%;
  height: 54px;
  padding: 0 20px;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 500;

  cursor: pointer;

  ${({ provider }) =>
    provider === 'kakao' &&
    css`
      background-color: ${({ theme }) => theme.color.kakao};
      color: ${({ theme }) => theme.fontColor.kakao};

      svg {
        position: absolute;
        top: 17px;
        left: 17px;
      }
    `}

  ${({ provider }) =>
    provider === 'twitter' &&
    css`
      background-color: ${({ theme }) => theme.color.twitter};
      color: ${({ theme }) => theme.fontColor.white};

      svg {
        position: absolute;
        top: 15px;
        left: 16px;
      }
    `}
`;
