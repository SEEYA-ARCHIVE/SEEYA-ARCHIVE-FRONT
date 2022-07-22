import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import useModal from 'src/hooks/useModal';
import { userSessionState } from 'src/stores/user';
import { media } from 'src/styles/theme';
import styled from 'styled-components';
import AlertModal from '../modal/AlertModal';
import { FABButton } from './FABButton';

interface Props {}

export const UploadButton: FC<Props> = () => {
  const userSession = useRecoilValue(userSessionState);
  const router = useRouter();
  const { openModal } = useModal();

  const clickUploadButton = () => {
    if (!userSession) {
      openModal(<AlertModal color="blue5" mainMsg="로그인 후 이용 가능합니다." onClick={() => router.push('/auth')} />);
      return;
    }
    router.push('/upload');
  };

  return (
    <FABButton
      value="업로드"
      bgColor="yellow"
      position={{ bottom: 40, right: 90 }}
      className="upload_btn"
      onClick={clickUploadButton}
    />
  );
};

const Wrap = styled.div`
  ${media.tablet} {
    right: 30px;
    bottom: -65px;
  }
`;
