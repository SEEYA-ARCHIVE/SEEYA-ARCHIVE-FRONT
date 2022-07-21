import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  nickname: string;
  comment: string;
  createdAt: string;
}

const ReviewComment: FC<Props> = ({ nickname, comment, createdAt }) => {
  return (
    <Wrapper>
      <CommentWrapper>
        <Nickname>{nickname}</Nickname>
        <div>
          <Comment>
            <CommentText>{comment}</CommentText>
          </Comment>
          <UnderWrapper>
            <CreatedAt>{createdAt}</CreatedAt>
            <Reply>답글 달기</Reply>
          </UnderWrapper>
        </div>
      </CommentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CommentWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Nickname = styled.p`
  font-size: 12px;
  font-weight: 900;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CommentText = styled.p`
  font-weight: 500;
  font-size: 12px;
`;

const UnderWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 12px;
`;

const CreatedAt = styled.p`
  font-weight: 500;
  font-size: 9px;
  line-height: 16px;

  display: flex;
  align-items: center;

  color: #c4c4c4;
`;

const Reply = styled.p`
  font-weight: 500;
  font-size: 9px;
  line-height: 16px;

  display: flex;
  align-items: center;

  color: #c4c4c4;
`;

export default ReviewComment;
