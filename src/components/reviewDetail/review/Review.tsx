import React, { VFC } from 'react';
import Icon from 'src/components/common/icon/Icon';
import { convertDateToFormattedStringDate } from 'src/utils/date';
import styled from 'styled-components';
import CommentFactory from '../reviewComment/CommentFactory';
import ReviewComments from '../reviewComment/ReviewComments';
import ReviewTagList from '../reviewTagList/ReviewTagList';
import ReviewText from './ReviewText';

interface Props {
  reviewText: string;
  concertHall: string;
  seatArea: string;
  createAt: string;
}

const Review: VFC<Props> = ({ reviewText, concertHall, seatArea, createAt }) => {
  const formattedCreateAt = convertDateToFormattedStringDate(createAt);

  return (
    <ReviewWrapper>
      <div>
        <ReviewTitle>시야봇</ReviewTitle>
        <CreatedAtText>{formattedCreateAt}</CreatedAtText>
      </div>
      <ReviewText text={reviewText} />
      <TagListWrapper>
        <ReviewTagList tagList={[concertHall, seatArea]} />
      </TagListWrapper>
      <CommentsWrapper>
        <ReviewComments />
      </CommentsWrapper>
      <CommentFactory />
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.div`
  padding: 19px 21.5px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 20px;
  min-width: 300px;
  height: 500px;
`;

const ReviewTitle = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor.black};
`;

const CreatedAtText = styled.p`
  margin-top: 8px 0 16px 0;
  font-size: 9px;
  line-height: 28px;
  color: ${({ theme }) => theme.fontColor.gray5};
`;

const TagListWrapper = styled.div`
  margin: 14px 0;
`;

const CommentsWrapper = styled.div`
  padding: 14px 1.5px;
  margin-bottom: 14px;

  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

export default Review;
