import React from 'react';
import styled from 'styled-components';

const ReviewComments = () => {
  return (
    <Wrapper>
      <Nickname>SeeyaBot</Nickname>
      <Comment>
        <CommentText>댓글 기능 제공 예정입니다.</CommentText>
      </Comment>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default ReviewComments;
