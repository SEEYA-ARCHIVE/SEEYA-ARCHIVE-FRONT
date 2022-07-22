import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface Props {
  onChangeReview: (value: string) => void;
}

export const UploadFormReview: FC<Props> = ({ onChangeReview }) => {
  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChangeReview(value);
  };
  return (
    <Wrap>
      <Title>
        <span className="title">리뷰</span>
        <span className="desc">REVIEW</span>
      </Title>
      <Review placeholder="리뷰 여기에 입력하기" maxLength={500} onChange={handleReviewChange} />
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 0 43px 24px 43px;
`;

const Title = styled.div`
  .title {
    margin-bottom: 12px;
    font-weight: 700;
  }
  .desc {
    margin-left: 5px;
    font-size: 9px;
    color: ${({ theme }) => theme.fontColor.lightGray};
    letter-spacing: 0.2em;
  }
`;

const Review = styled.textarea`
  margin-top: 12px;
  width: 100%;
  min-height: 100px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  resize: none;
  line-height: 1.5;

  &::placeholder {
    font-size: 12px;
    color: ${({ theme }) => theme.fontColor.lightGray};
    text-align: center;
    line-height: 72px;
  }
`;
