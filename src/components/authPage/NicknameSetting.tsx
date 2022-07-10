import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'src/components/common/button/Button';

type NicknameStatus = 'error' | 'success';

const NicknameSetting = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>('error');
  const [showError, setShowError] = useState(false);

  const changeNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);

    if (showError) setShowError(false);
  };

  const clickDuplicateButton = () => {};

  const submitNikcname = () => {};

  return (
    <NicknameWrapper>
      <NicknameInputWrapper>
        <NicknameInput
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={changeNicknameInput}
        />
        <NicknameButton>중복확인</NicknameButton>
      </NicknameInputWrapper>
      <NicknameStatusText status={nicknameStatus}>
        {showError &&
          (nicknameStatus === 'success' ? '사용할 수 있는 닉네임입니다.' : '중복입니다. 다른 닉네임을 입력해주세요.')}
      </NicknameStatusText>
      <SubmitButton bgColor="mint">확인</SubmitButton>
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
  font-size: 12px;
  line-height: 16px;

  color: ${({ theme, status }) => (status === 'success' ? theme.color.success : theme.color.error)};
`;

const SubmitButton = styled(Button)`
  margin-top: 128px;
  padding: 3px 29.5px;

  border-radius: 4px;

  font-weight: 500;
  font-size: 12px;
  line-height: 28px;
`;
