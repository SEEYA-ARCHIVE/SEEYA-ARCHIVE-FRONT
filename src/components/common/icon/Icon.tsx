import React, { VFC } from 'react';
import styled, { css } from 'styled-components';

import * as icons from 'src/components/common/icon/iconPath';
import { ColorType } from 'src/types/commonType';

/** interface */
export interface IconProps {
  name: keyof typeof icons;

  rotate?: 0 | 90 | 180 | 270;
  size?: number;
  fillColor?: ColorType;
  strokeColor?: ColorType;
  opacity?: string;
  className?: string;
}

/** component */
const Icon: VFC<IconProps> = ({ name, size, rotate, fillColor, strokeColor, opacity, className }) => {
  const SVGIcon = icons[name];

  return (
    <SVGWrap
      size={size}
      fillColor={fillColor}
      strokeColor={strokeColor}
      opacity={opacity}
      className={className}
      rotate={rotate}>
      <SVGIcon />
    </SVGWrap>
  );
};
export default Icon;

/** styled component */
const SVGWrap = styled.div<Pick<IconProps, 'size' | 'fillColor' | 'strokeColor' | 'opacity' | 'rotate'>>`
  width: ${({ size }) => `${size ? size : 'auto'}px`};
  height: ${({ size }) => `${size ? size : 'auto'}px`};

  display: inline-block;

  opacity: ${({ opacity }) => opacity || '1'};
  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(${rotate}deg);
    `};
  & svg {
    width: auto;
    height: 100%;

    display: block;
  }
  & path,
  & circle,
  & g {
    fill: ${({ fillColor, theme }) => fillColor && `${theme.color[fillColor]}`};
    stroke: ${({ strokeColor, theme }) => strokeColor && `${theme.color[strokeColor]}`};
  }
`;
