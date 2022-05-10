import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { GridChildComponentProps } from 'react-window';
import { IReviewPreivew } from 'src/types/api/review';
import { ReviewCard } from './ReviewCard';
import InfiniteScrollGrid from '../common/infiniteScroll/InfiniteScrollGrid';

interface Props {
  seatAreaId: number;
  list: IReviewPreivew[];
  colCount: number;
  count: number;
  page: number;
  addPage: () => void;
}

const ReviewList: FC<Props> = ({ seatAreaId, list, colCount, count, page, addPage }) => {
  const limit = 6;

  const isItemLoaded = (index: number) => index < list.length;

  const Cell = ({ columnIndex, rowIndex, data, style }: GridChildComponentProps) => {
    const cursorIndex = rowIndex * colCount + columnIndex;

    if (!isItemLoaded(cursorIndex)) return <></>;

    const reviewItem = data[cursorIndex];
    const {
      id,
      createAt,
      images: { previewImage, numImages },
    } = reviewItem;

    return (
      <div style={style}>
        <Link href={`/seat?seatAreaId=${seatAreaId}&reviewId=${id}`} passHref>
          <a>
            <ReviewCard
              key={id}
              seatAreaId={seatAreaId}
              reviewId={id}
              surplusPic={numImages}
              createdAt={createAt}
              imgSrc={previewImage}
            />
          </a>
        </Link>
      </div>
    );
  };

  const loadMore = () => {
    if (count < limit * page) {
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
