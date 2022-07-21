import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getUserInitialNickname } from 'src/stores/user';
import { checkDuplicateNicknameAPI, setUserNikcnameAPI } from 'src/api/user';
import { useRouter } from 'next/router';

type NicknameStatus = 'error' | 'success';

const NicknameSetting = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>('error');
  const [showStatus, setShowStatus] = useState(false);
  const initialNickname = useRecoilValue(getUserInitialNickname);

  const onChangeNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);

    if (showStatus) setShowStatus(false);
  };

  useEffect(() => {
    if (!initialNickname) return;

    setNickname(initialNickname);
  }, [initialNickname]);

  const onClickDuplicateButton = async () => {
    const spaceRegExp = /\s/g;
    if (spaceRegExp.test(nickname)) {
      setNicknameStatus('error');
      setShowStatus(true);
      return;
    }

    const isAvailable = await checkDuplicateNicknameAPI(nickname);

    if (isAvailable) setNicknameStatus('success');
    else setNicknameStatus('error');

    setShowStatus(true);
  };

  const onSubmitNikcname = async () => {
    try {
      await setUserNikcnameAPI(nickname);
      router.push('/');
    } catch (e) {
      // TODO 에러 핸들링
    }
  };

  return (
    <NicknameWrapper>
      <NicknameInputWrapper>
        <NicknameInput
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={onChangeNicknameInput}
        />
        <NicknameButton onClick={onClickDuplicateButton}>중복확인</NicknameButton>
      </NicknameInputWrapper>
      <NicknameStatusText status={nicknameStatus}>
        {showStatus && (nicknameStatus === 'success' ? '사용할 수 있는 닉네임입니다.' : '다른 닉네임을 입력해주세요.')}
      </NicknameStatusText>
      <SubmitButton disabled={nicknameStatus === 'error'} onClick={onSubmitNikcname}>
        확인
      </SubmitButton>
    </NicknameWrapper>
  );
};

export default NicknameSetting;

const NicknameWrapper = styled.div`
  margin-top: 167px;
  padding: 0 38px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NicknameInputWrapper = styled.div`
  width: 100%;

  display: flex;
  gap: 12px;
  align-items: center;
`;

const NicknameInput = styled.input`
  padding: 15px 16px;

  flex: 1;

  border: none;
  border-radius: 8px;

  background: ${({ theme }) => theme.color.gray5};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray4};
  }
`;

const NicknameButton = styled.button`
  padding: 16px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.mint};

  font-weight: 500;
  font-size: 14px;
  line-height: 14px;

  background-color: ${({ theme }) => theme.color.white};
  color: #376f77;
`;

const NicknameStatusText = styled.p<{ status: NicknameStatus }>`
  margin-left: 4px;
  width: 100%;
  height: 16px;

  font-size: 12px;
  line-height: 16px;

  color: ${({ theme, status }) => (status === 'success' ? theme.color.success : theme.color.error)};
`;

const SubmitButton = styled.button`
  margin-top: 128px;
  padding: 3px 29.5px;

  border: none;
  border-radius: 4px;

  font-weight: 500;
  font-size: 12px;
  line-height: 28px;

  background-color: ${({ theme }) => theme.color.mint};
  color: ${({ theme }) => theme.fontColor.white};

  &:disabled {
    cursor: default;

    opacity: 0.4;
    background-color: ${({ theme }) => theme.color.gray4};
    border: 1px solid ${({ theme }) => theme.fontColor.gray};
    color: ${({ theme }) => theme.fontColor.gray};
  }
`;
