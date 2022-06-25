import React, { FC, useState } from 'react';
import Icon from 'src/components/common/icon/Icon';
import styled from 'styled-components';
import { CompareReviewType, ThumbnailViewer } from './ThumbnailViewer';

interface Props {
  reviewList: CompareReviewType[];
}

export const ThumbnailList: FC<Props> = ({ reviewList }) => {
  const [currentReviewIdx, setCurrentReivewIdx] = useState(0);

  const goPrevIdx = () => {
    if (currentReviewIdx - 1 < 0) return;
    setCurrentReivewIdx(currentReviewIdx - 1);
  };
  const goNextIdx = () => {
    if (currentReviewIdx + 1 >= reviewList.length) return;
    setCurrentReivewIdx(currentReviewIdx + 1);
  };

  return (
    <Wrap>
      {reviewList?.length ? (
        <ThumbnailViewer {...reviewList[currentReviewIdx]}></ThumbnailViewer>
      ) : (
        <EmptyBox>
          <div>비교할 구역을</div>
          <div>
            <span className="highlight">클릭</span>하세요.
          </div>
        </EmptyBox>
      )}
      {reviewList?.length ? (
        <ReviewHandlerWrap>
          <Icon name="iconTriangle" onClick={goPrevIdx} opacity={currentReviewIdx - 1 < 0 ? '0.3' : ''} />
          <ReviewCounter>
            {currentReviewIdx + 1} / {reviewList.length}
          </ReviewCounter>
          <Icon
            name="iconTriangle"
            rotate={180}
            onClick={goNextIdx}
            opacity={currentReviewIdx + 1 >= reviewList.length ? '0.3' : ''}
          />
        </ReviewHandlerWrap>
      ) : null}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewHandlerWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  svg {
    cursor: pointer;
  }
`;

const ReviewCounter = styled.div`
  padding: 6px;

  background: rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.fontColor.white};
  border-radius: 4px;

  margin: 0 25px;

  font-weight: 700;
  font-size: 9px;
  line-height: 9px;
`;

const EmptyBox = styled.div`
  width: 389px;
  height: 389px;
  background: #f9f9f9;
  border: 2px dashed #c4c4c4;
  border-radius: 12px;
  color: #7b7b7b;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .highlight {
    color: ${({ theme }) => theme.fontColor.black};
  }
`;
