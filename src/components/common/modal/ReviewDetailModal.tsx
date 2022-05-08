import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

import { ModalHOC, ModalWrappedProps } from './ModalHOC';
import { ImgViewer } from 'src/components/common/imgViewer/ImgViewer';
import { iconX } from '../icon/iconPath';

import Review from 'src/components/reviewDetail/review/Review';
import useModal from 'src/hooks/useModal';
import { useRecoilValueLoadable } from 'recoil';
import { getReviewDetail } from 'src/stores/review';

interface Props extends ModalWrappedProps {
  seatAreaId: number;
  reviewId: number;
}

const ReviewDetailModal: FC<Props> = ({ seatAreaId, reviewId }) => {
  const [selectedReviewId, setSelectedReviewId] = useState(reviewId);
  const { contents: reviewData, state: reviewDetailState } = useRecoilValueLoadable(
    getReviewDetail([seatAreaId, selectedReviewId]),
  );

  const { closeCurrentModal } = useModal();

  const onClickPrevButton = () => {
    if (!reviewData.previousId) return;

    setSelectedReviewId(reviewData.previousId);
  };

  const onClickNextButton = () => {
    if (!reviewData.nextId) return;

    setSelectedReviewId(reviewData.nextId);
  };

  if (reviewDetailState === 'loading') return <></>;

  return (
    <Wrapper>
      <CloseX onClick={closeCurrentModal} />
      <ImgViewer imgList={reviewData.images} userId="시야봇" />
      <Review
        // TODO : 리뷰 텍스트가 아직 DB에 없음.
        reviewId={reviewData.id}
        reviewText="콘서트 시야를 탐색하고 계신가요?\n시야 아카이브를 북마크에 추가하고\n공연 티케팅 시에 시야를 참고하세요.\n#시야아카이브#테스트"
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
