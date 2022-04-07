import React, { FC, VFC } from 'react';

import * as seats from 'src/components/common/seats/seatsPath';
import styled from 'styled-components';

interface Props {
  name: keyof typeof seats;
  size?: number;
  className?: string;
}

/** component */
export const Seats: VFC<Props> = ({ name, size, className }) => {
  const SVGSeat = seats[name];

  return (
    <SVGWrap size={size} className={className}>
      <SVGSeat />
    </SVGWrap>
  );
};

/** styled component */
const SVGWrap = styled.div<Pick<Props, 'size'>>`
  width: ${({ size }) => `${size ? size : 'auto'}px`};
  height: ${({ size }) => `${size ? size : 'auto'}px`};

  display: inline-block;

  & svg {
    width: auto;
    height: 100%;

    display: block;
  }
`;
