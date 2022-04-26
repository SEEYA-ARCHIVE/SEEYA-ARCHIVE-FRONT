import React, { FC } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps, GridOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { IReviewPreivew } from 'src/types/api';
import { ReviewCard } from './ReviewCard';
import styled from 'styled-components';

interface Props {
  list: IReviewPreivew[];
  colCount: number;
  count: number;
  page: number;
  addPage: () => void;
}

const GUTTER_SIZE = 10;
const LIMIT = 10;

const ReviewList: FC<Props> = ({ list, colCount, count, page, addPage }) => {
  const isItemLoaded = (index: number) => index < list.length;

  const Cell = ({ columnIndex, rowIndex, data, style }: GridChildComponentProps) => {
    const cursorIndex = rowIndex * colCount + columnIndex;
    console.log(cursorIndex);
    console.log(list.length);

    if (!isItemLoaded(cursorIndex)) return <div style={style}>Loading</div>;

    const reviewItem = data[cursorIndex];
    const {
      id,
      createAt,
      images: { previewImages, numImages },
    } = reviewItem;

    return (
      <div style={style}>
        <ReviewCard key={id} surplusPic={numImages} createdAt={createAt} imgSrc={previewImages} />
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
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={list.length + 1} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => {
              // onItemsRendered는 Grid가 아닌 List를 사용하면 <List onItemsRendered={onItemsRendered} />이렇게 넘겨주면 됩니다.
              // 그러나 Grid를 사용하면 리스트의 바닥에 스크롤이 도달해도 자동으로 onItemsRendered가 실행 되지 않습니다. 그래서 아래처럼 임의 함수를 만들어서 <Grid onItemsRendered={newItemsRendered} /> 형태로 넘깁니다.
              const newItemsRendered = (gridData: GridOnItemsRenderedProps) => {
                const { visibleRowStopIndex, overscanRowStartIndex, overscanRowStopIndex, overscanColumnStopIndex } =
                  gridData;

                const visibleStartIndex = overscanRowStartIndex * overscanColumnStopIndex;
                const visibleStopIndex = overscanRowStopIndex * overscanColumnStopIndex;
                // 현재 브라우저에 보여지는 list가 맨 바닥이면 onItemsRendered를 실행한다.
                if (visibleRowStopIndex >= list.length / 3 - 1) {
                  onItemsRendered({
                    visibleStartIndex,
                    visibleStopIndex,
                    overscanStartIndex: overscanRowStartIndex,
                    overscanStopIndex: overscanRowStopIndex,
                  });
                }
              };

              return (
                <Grid
                  style={{ paddingBottom: '100px', overflowX: 'hidden' }}
                  itemData={list}
                  columnCount={colCount}
                  columnWidth={229}
                  rowCount={Math.ceil(list.length / colCount)}
                  rowHeight={302}
                  width={width}
                  height={height}
                  onItemsRendered={newItemsRendered}
                  ref={ref}>
                  {Cell}
                </Grid>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default ReviewList;
