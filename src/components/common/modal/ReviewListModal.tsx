import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Select } from 'src/components/common/select/Select';
import { ReviewCard } from 'src/components/reviewListPage/ReviewCard';
import Icon from '../icon/Icon';
import { useRecoilValueLoadable } from 'recoil';
import { IReviewPreivew } from 'src/types/api/review';
import { getReviewList } from 'src/stores/review';
import ReviewList from 'src/components/reviewListPage/ReviewList';
import { ModalHOC } from './ModalHOC';
import useModal from 'src/hooks/useModal';

interface Props {
  seatAreaId: number;
}
const SORT_OPTIONS = [{ value: 'latest', label: '최신순' }];

const ReviewListModal: FC<Props> = ({ seatAreaId }) => {
  const [isShow, setIsShow] = useState(true);
  const [sort, setSort] = useState('');
  const [reviewList, setReviewList] = useState<IReviewPreivew[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [page, setPage] = useState(1);
  const { closeCurrentModal } = useModal();
  const { contents: reviewListContents, state: reviewListState } = useRecoilValueLoadable(
    getReviewList([seatAreaId, page]),
  );

  const handleChevronClick = () => {
    setIsShow(false);

    setTimeout(() => {
      closeCurrentModal();
    }, 1000);
  };

  const addPage = () => setPage((prev) => prev + 1);

  const fetchData = async () => {
    switch (reviewListState) {
      case 'loading':
        break;
      case 'hasValue':
        setReviewList((prev) => [...prev, ...reviewListContents.results]);
        if (!reviewCount) setReviewCount(reviewListContents.count);

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [reviewListState]);

  return (
    <Wrapper isShow={isShow}>
      <ReviewWrapper>
        <TitleWrapper>
          <Title>
            <strong>{reviewCount}건</strong>의 리뷰가 있습니다.
          </Title>
          <Select options={SORT_OPTIONS} value={sort} onChange={setSort} />
        </TitleWrapper>
        <ScrollWrapper>
          <ReviewListWrapper>
            <ReviewList list={reviewList} colCount={3} count={reviewCount} page={page} addPage={addPage} />
          </ReviewListWrapper>
        </ScrollWrapper>
      </ReviewWrapper>
      <IconWrapper onClick={handleChevronClick}>
        <Icon name="iconCircleChevronRight" />
      </IconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isShow: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 80vw;
  height: 100%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
  background-color: ${({ theme }) => theme.color.white};
  border-left: 4px solid ${({ theme }) => theme.color.mint};
  padding: 36px 0 0 54px;

  animation: ${({ theme, isShow }) =>
    isShow
      ? css`
          ${theme.animation.slideIn} 1s ease-in
        `
      : css`
          ${theme.animation.slideOut} 1s ease-in-out
        `};
`;

const ReviewWrapper = styled.div`
  width: 675px;
  height: 100%;
`;

const TitleWrapper = styled.div`
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 28px;
  color: ${({ theme }) => theme.color.darkGray};

  strong {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.blue};
  }
`;

const ScrollWrapper = styled.div`
  width: 705px;
  height: calc(100% - 36px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: block;
    width: 8px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 6px;
  }
`;

const ReviewListWrapper = styled.div`
  width: 675px;
  height: 100%;
  margin-top: 15px;

  padding-bottom: 10px;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 0;
  cursor: pointer;
`;

export default ModalHOC(ReviewListModal);
