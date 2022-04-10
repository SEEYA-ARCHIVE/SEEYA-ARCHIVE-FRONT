import React, { FC, useEffect, useRef, VFC } from 'react';

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
  const seatRef = useRef<HTMLDivElement>(null);

  const handleSeatClick = () => {
    console.log('work');
  };

  const isPolygon = (element: any) => {
    return !!element.getAttribute('stroke');
  };

  useEffect(() => {
    if (!seatRef.current) return;

    const pathList = seatRef.current.querySelectorAll('path');
  }, []);

  return (
    <SVGWrap ref={seatRef} size={size} className={className}>
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
// let seatObj: any = {
//   polygon: [],
//   word: [],
// };
// (pathList as any).forEach((v: any, idx: number) => {
//   const obj: any = {};
//   obj.d = v.getAttribute('d');
//   if (isPolygon(v)) {
//     obj.stroke = '#C4C4C4';
//     obj.fill = '#EFEFEF';
//     obj['stroke-width'] = '2';
//     obj['stroke-dasharray'] = '4 4';

//     seatObj.polygon.push(obj);
//   } else {
//     obj.fill = '#C4C4C4';
//     seatObj.word.push(obj);
//   }
// });
// console.log(JSON.stringify(seatObj));
// }, []);
