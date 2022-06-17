import React from 'react';
import styled from 'styled-components';
import ReviewComment from './ReviewComments';

const ReviewCommentList = () => {
  // TODO API 연동
  return (
    <Wrapper>
      <ReviewComment nickname="SeeyaBot" comment="댓글기능 추가 예정입니다." createdAt="2022/06/16" />
    </Wrapper>
  );
};

export default ReviewCommentList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;

  width: 255px;
  height: 156px;
  overflow-x: hidden;
  overflow-y: auto;
`;
