import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

import { ModalHOC } from './ModalHOC';
import { ImgViewer } from 'src/components/common/imgViewer/ImgViewer';
import { iconX } from '../icon/iconPath';

import Review from 'src/components/reviewDetail/review/Review';
import useModal from 'src/hooks/useModal';
import { useRecoilValueLoadable } from 'recoil';
import { getReviewDetail } from 'src/stores/review';
import { useRouter } from 'next/router';

interface Props {
  hallId: number;
  seatAreaId: number;
  reviewId: number;
}

const ReviewDetailModal: FC<Props> = ({ hallId, seatAreaId, reviewId }) => {
  const router = useRouter();
  const [selectedReviewId, setSelectedReviewId] = useState(reviewId);
  const { closeCurrentModal } = useModal();

  const { contents: reviewData, state: reviewDetailState } = useRecoilValueLoadable(
    getReviewDetail([seatAreaId, selectedReviewId]),
  );

  const onClickCloseButton = () => {
    closeCurrentModal();
    router.push(`/seat?hallId=${hallId}`);
  };

  const onClickPrevButton = () => {
    if (!reviewData.previousId) return;

    setSelectedReviewId(reviewData.previousId);
    router.push(`/seat?hallId=${hallId}&seatAreaId=${seatAreaId}&reviewId=${reviewData.previousId}`);
  };

  const onClickNextButton = () => {
    if (!reviewData.nextId) return;

    setSelectedReviewId(reviewData.nextId);
    router.push(`/seat?hallId=${hallId}&seatAreaId=${seatAreaId}&reviewId=${reviewData.nextId}`);
  };

  if (reviewDetailState === 'loading') return <></>;

  return (
    <Wrapper>
      <CloseX onClick={onClickCloseButton} />
      <ImgViewer imgList={reviewData.images} userId="시야봇" />
      <Review
        reviewId={reviewData.id}
        reviewText={reviewData.review}
        concertHall={reviewData.concertHallName}
        seatArea={reviewData.seatArea}
        createAt={reviewData.createAt}
      />
      {reviewData.previousId && <Triangle rotate={90} position={{ left: -57 }} onClick={onClickPrevButton} />}
      {reviewData.nextId && <Triangle rotate={270} position={{ right: -57 }} onClick={onClickNextButton} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

  position: relative;
`;

const CloseX = styled(iconX)`
  position: absolute;
  top: 0;
  right: -68px;

  cursor: pointer;
`;

const Triangle = styled.div<{
  rotate: 0 | 90 | 180 | 270;
  position: { top?: number; bottom?: number; left?: number; right?: number };
}>`
  width: 0;
  height: 0;

  border-top: 25px solid ${({ theme }) => theme.color.white};
  border-left: 12.5px solid transparent;
  border-right: 12.5px solid transparent;

  cursor: pointer;

  transform: ${({ rotate }) => (rotate ? `rotate(${rotate}deg)` : '')};

  position: absolute;
  ${({ position }) =>
    css`
      ${position?.top && `top: ${position.top}px;`}
      ${position?.right && `right: ${position.right}px;`}
      ${position?.bottom && `bottom: ${position.bottom}px;`}
      ${position?.left && `left: ${position.left}px;`}
    `}
`;

export default ModalHOC(ReviewDetailModal);
