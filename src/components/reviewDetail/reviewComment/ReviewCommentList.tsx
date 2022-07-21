import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { getReviewCommentList } from 'src/stores/review';
import { convertDateToFormattedStringDate } from 'src/utils/date';
import styled from 'styled-components';
import ReviewComment from './ReviewComment';

interface Props {
  reviewId: number;
}

const ReviewCommentList: FC<Props> = ({ reviewId }) => {
  const commentListData = useRecoilValue(getReviewCommentList(reviewId));

  return (
    <Wrapper>
      {commentListData.map((commentData) => (
        <ReviewComment
          key={commentData.id}
          nickname={''}
          comment={commentData.comment}
          createdAt={convertDateToFormattedStringDate(commentData.createAt)}
        />
      ))}
    </Wrapper>
  );
};

export default ReviewCommentList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;

  width: 255px;
  max-height: 100px;
  overflow-x: hidden;
  overflow-y: auto;
`;
