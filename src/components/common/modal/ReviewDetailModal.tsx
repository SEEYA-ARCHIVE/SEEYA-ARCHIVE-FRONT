import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

import { ModalHOC } from 'src/hocs/withModalBackground';
import { ImgViewer } from 'src/components/common/imgViewer/ImgViewer';
import { iconX } from '../icon/iconPath';

import Review from 'src/components/reviewDetail/review/Review';
import useModal from 'src/hooks/useModal';
import { useRecoilValueLoadable } from 'recoil';
import { getReviewDetail } from 'src/stores/review';
import { useRouter } from 'next/router';
import { ROUTE } from 'src/route';

interface Props {
  hallId: number;
  seatAreaId: number;
  reviewId: number;
  /**비교하기 페이지에서 리뷰디테일을 열었는 경우 true */
  isFromComparePage?: boolean;
}

const ReviewDetailModal: FC<Props> = ({ hallId, seatAreaId, reviewId, isFromComparePage = false }) => {
  const router = useRouter();
  const [selectedReviewId, setSelectedReviewId] = useState(reviewId);
  const { closeCurrentModal } = useModal();

  const { contents: reviewData, state: reviewDetailState } = useRecoilValueLoadable(
    getReviewDetail([seatAreaId, selectedReviewId]),
  );

  const onClickCloseButton = () => {
    closeCurrentModal();
    router.push(`${isFromComparePage ? ROUTE.SEAT_COMPARE : ROUTE.SEAT}?hallId=${hallId}`);
  };

  const onClickPrevButton = () => {
    if (!reviewData.previousId) return;

    setSelectedReviewId(reviewData.previousId);
    router.push(
      `${isFromComparePage ? ROUTE.SEAT_COMPARE : ROUTE.SEAT}?hallId=${hallId}&seatAreaId=${seatAreaId}&reviewId=${
        reviewData.previousId
      }`,
      `/review/${seatAreaId}/${reviewData.previousId}`,
    );
  };

  const onClickNextButton = () => {
    if (!reviewData.nextId) return;

    setSelectedReviewId(reviewData.nextId);
    router.push(
      `${isFromComparePage ? ROUTE.SEAT_COMPARE : ROUTE.SEAT}?hallId=${hallId}&seatAreaId=${seatAreaId}&reviewId=${
        reviewData.nextId
      }`,
      `/review/${seatAreaId}/${reviewData.nextId}`,
    );
  };

  if (reviewDetailState === 'loading') return <></>;

  return (
    <Wrapper>
      <CloseX onClick={onClickCloseButton} />
      <ImgViewer imgList={reviewData.imageUrlArray} userId="시야봇" />
      <Review
        reviewId={reviewData.id}
        reviewText={reviewData.review}
        concertHall={reviewData.concertHallName}
        seatArea={reviewData.seatArea}
        createAt={reviewData.createAt}
      />
      {reviewData.previousId && (
        <TriangleButton position={{ left: -87 }} onClick={onClickPrevButton}>
          <Triangle rotate={90} />
        </TriangleButton>
      )}
      {reviewData.nextId && (
        <TriangleButton position={{ right: -87 }} onClick={onClickNextButton}>
          <Triangle rotate={270} />
        </TriangleButton>
      )}
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

const TriangleButton = styled.button<{ position: { top?: number; bottom?: number; left?: number; right?: number } }>`
  border: none;
  background: transparent;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 80px;

  position: absolute;
  ${({ position }) =>
    css`
      ${position?.top && `top: ${position.top}px;`}
      ${position?.right && `right: ${position.right}px;`}
      ${position?.bottom && `bottom: ${position.bottom}px;`}
      ${position?.left && `left: ${position.left}px;`}
    `}
`;

const Triangle = styled.div<{ rotate: 0 | 90 | 180 | 270 }>`
  width: 0;
  height: 0;

  border-top: 25px solid ${({ theme }) => theme.color.white};
  border-left: 12.5px solid transparent;
  border-right: 12.5px solid transparent;

  cursor: pointer;

  transform: ${({ rotate }) => (rotate ? `rotate(${rotate}deg)` : '')};
`;

export default ModalHOC(ReviewDetailModal);
