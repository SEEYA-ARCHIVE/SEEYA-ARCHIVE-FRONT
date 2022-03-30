import styled, { css } from 'styled-components';

export const Wrapper = styled.div``;

export const Img = styled.img<{ isSelected?: boolean }>`
  border-radius: 10px;

  ${({ theme, isSelected }) =>
    isSelected &&
    css`
      border: 4px solid ${theme.color.highLight};
    `}
`;

export const MinImgWrapper = styled.div<{ gap: number }>`
  display: flex;
  margin-top: 8px;

  & > *:not(:first-child) {
    margin-left: ${({ gap }) => `${gap}px`};
  }
`;

export const EmptyImg = styled.div<{
  width: number;
  height: number;
}>`
  background-color: #b1b1b1;

  border-radius: 10px;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
