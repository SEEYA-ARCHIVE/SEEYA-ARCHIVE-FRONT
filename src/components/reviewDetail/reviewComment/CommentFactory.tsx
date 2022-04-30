import React, { VFC } from 'react';
import Icon from 'src/components/common/icon/Icon';
import styled from 'styled-components';

interface Props {}

const CommentFactory: VFC<Props> = () => {
  return (
    <Wrapper>
      <InteractionWrapper>
        <LikeWrapper>
          <LikeButton>
            <Icon name="iconThumbsUp" size={15} />
          </LikeButton>
          도움이 돼요!
        </LikeWrapper>
        <RepotButton>
          <Icon name="iconReport" size={12} />
          신고하기
        </RepotButton>
      </InteractionWrapper>
      <CommentInput type="text" placeholder="댓글 기능 제공 예정입니다." disabled />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InteractionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;

  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor.black};
`;

const LikeButton = styled.button`
  background-color: ${({ theme }) => theme.color.white};

  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.color.gray2};

  padding: 3px 10px;
`;

const RepotButton = styled.button`
  display: flex;
  gap: 2px;
  align-items: center;

  padding: 5.5px 8px;

  background-color: ${({ theme }) => theme.color.gray5};
  color: #c4c4c4;
  font-size: 9px;
  font-weight: 500;

  border-radius: 25px;
`;

const CommentInput = styled.input`
  padding: 8px 0 8px 16px;

  background-color: ${({ theme }) => theme.color.gray5};
  color: ${({ theme }) => theme.fontColor.black};

  border: none;
  border-radius: 16px;

  font-size: 12px;
  font-weight: 500;

  ::placeholder {
    color: #c4c4c4;
  }
`;

export default CommentFactory;
