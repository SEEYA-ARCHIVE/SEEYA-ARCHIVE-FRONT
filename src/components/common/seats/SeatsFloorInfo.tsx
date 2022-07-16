import React, { FC } from 'react';
import styled, { css } from 'styled-components';

interface Props {}

export const SeatsFloorInfo: FC<Props> = () => {
  return (
    <Wrap>
      <FloorDataWrap>
        <FloorMark type={1} />
        <span>1층</span>
      </FloorDataWrap>
      <FloorDataWrap>
        <FloorMark type={2} />
        <span>2층</span>
      </FloorDataWrap>
      <FloorDataWrap>
        <FloorMark type={0} />
        <span>리뷰없음</span>
      </FloorDataWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const FloorDataWrap = styled.div`
  display: flex;
  margin-right: 10px;
  font-weight: 700;
  font-size: 9px;
  line-height: 12px;
`;

/**
 * DOCS
 * 0 - 리뷰없음
 * 1 - 1층
 * 2 - 2층
 */
const FloorMark = styled.div<{ type: 0 | 1 | 2 }>`
  width: 12px;
  height: 12px;
  margin-right: 4px;
  border-radius: 4px;
  ${({ type, theme }) => {
    switch (type) {
      case 0:
        return css`
          background-color: #efefef;
          border: 2px dashed #c4c4c4;
        `;
      case 1:
        return css`
          background-color: ${theme.color.yellow};
        `;
      case 2:
        return css`
          background-color: ${theme.color.mint};
        `;
    }
  }}
`;
