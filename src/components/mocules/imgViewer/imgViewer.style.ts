import styled, { css } from 'styled-components';

export const Wrapper = styled.div``;

export const Img = styled.img<{ isSelected?: boolean }>`
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 2px solid red;
    `}
`;

export const MinImgWrapper = styled.div<{ gap: number }>`
  display: flex;
  margin-top: 8px;

  & > *:not(:first-child) {
    margin-left: ${({ gap }) => `${gap}px`};
  }
`;

export const EmptyImg = styled.div<Pick<Props, 'width' | 'height'>>`
  background-color: #b1b1b1;

  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
