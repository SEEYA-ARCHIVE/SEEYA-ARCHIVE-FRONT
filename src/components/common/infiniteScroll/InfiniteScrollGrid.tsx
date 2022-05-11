import React, { ComponentType, FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeGrid as Grid, GridChildComponentProps, GridOnItemsRenderedProps } from 'react-window';

interface Props {
  list: any[];
  colCount: number;
  cellWidth: number;
  cellHeight: number;
  isItemLoaded: (index: number) => boolean;
  loadMore: () => void;
  children: ComponentType<GridChildComponentProps>;
}

const InfiniteScrollGrid: FC<Props> = ({
  children,
  list,
  colCount,
  cellWidth,
  cellHeight,
  isItemLoaded,
  loadMore,
}: Props) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={list.length + 1} loadMoreItems={loadMore}>
          {({ onItemsRendered, ref }) => {
            // Grid를 사용하면 리스트의 바닥에 스크롤이 도달해도 자동으로 onItemsRendered가 실행 되지 않음.
            // 그래서 아래처럼 임의 함수를 만들어서 넘김.
            const newItemsRendered = (gridData: GridOnItemsRenderedProps) => {
              const { visibleRowStopIndex, overscanRowStartIndex, overscanRowStopIndex, overscanColumnStopIndex } =
                gridData;

              const visibleStartIndex = overscanRowStartIndex * overscanColumnStopIndex;
              const visibleStopIndex = overscanRowStopIndex * overscanColumnStopIndex;
              // 현재 브라우저에 보여지는 list가 맨 바닥이면 onItemsRendered를 실행한다.
              if (visibleRowStopIndex >= list.length / colCount - 1) {
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
                columnWidth={cellWidth}
                rowCount={Math.ceil(list.length / colCount)}
                rowHeight={cellHeight}
                width={width}
                height={height}
                onItemsRendered={newItemsRendered}
                ref={ref}>
                {children}
              </Grid>
            );
          }}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default InfiniteScrollGrid;
