import React, { useState } from 'react';
import styled from 'styled-components';

const NicknameSetting = () => {
  const [nicknameStatus, setNicknameStatus] = useState<'error' | 'success'>('error');
  const [showError, setShowError] = useState(false);

  return (
    <NicknameWrapper>
      <NicknameInputWrapper>
        <NicknameInput type="text" placeholder="닉네임을 입력해주세요." />
        <NicknameButton>중복확인</NicknameButton>
      </NicknameInputWrapper>
      <NicknameStatus>
        {showError &&
          (nicknameStatus === 'success' ? '사용할 수 있는 닉네임입니다.' : '중복입니다. 다른 닉네임을 입력해주세요.')}
      </NicknameStatus>
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

const NicknameStatus = styled.p``;
