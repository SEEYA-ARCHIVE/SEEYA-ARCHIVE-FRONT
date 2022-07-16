import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { GridChildComponentProps } from 'react-window';
import { ReviewPreivew } from 'src/types/api/review';
import { ReviewCard } from './ReviewCard';
import InfiniteScrollGrid from '../common/infiniteScroll/InfiniteScrollGrid';

interface Props {
  hallId: number;
  seatAreaId: number;
  list: ReviewPreivew[];
  colCount: number;
  count: number;
  page: number;
  addPage: () => void;
}

const ReviewList: FC<Props> = ({ hallId, seatAreaId, list, colCount, count, page, addPage }) => {
  const LIMIT = 6;

  const isItemLoaded = (index: number) => index < list.length;

  const Cell = ({ columnIndex, rowIndex, data, style }: GridChildComponentProps) => {
    const cursorIndex = rowIndex * colCount + columnIndex;

    if (!isItemLoaded(cursorIndex)) return <></>;

    const reviewItem = data[cursorIndex];

    const { id, previewImage } = reviewItem;

    return (
      <div style={style}>
        <Link
          href={`/seat?hallId=${hallId}&seatAreaId=${seatAreaId}&reviewId=${id}`}
          as={`/review/${seatAreaId}/${id}`}
          passHref>
          <a>
            <ReviewCard key={id} hallId={hallId} seatAreaId={seatAreaId} reviewId={id} imgSrc={previewImage} />
          </a>
        </Link>
      </div>
    );
  };

  const loadMore = () => {
    if (count < LIMIT * page) {
      return;
    }
    addPage();
  };

  return (
    <Wrapper>
      <InfiniteScrollGrid
        list={list}
        colCount={colCount}
        loadMore={loadMore}
        isItemLoaded={isItemLoaded}
        cellWidth={229}
        cellHeight={302}>
        {Cell}
      </InfiniteScrollGrid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default ReviewList;
