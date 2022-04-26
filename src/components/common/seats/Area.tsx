import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import { SVGDataType, SVGInfoType } from './Seats';

export interface AreaPathType {
  id: string;
  floor: number | null;
  area: string | null;
  d: string;
  stroke: string;
  fill: string;
  'stroke-width'?: string;
  'stroke-dasharray'?: string;
}

interface Props extends AreaPathType {
  svgData: SVGDataType;
  setFocusedArea: Dispatch<SetStateAction<SVGInfoType | null>>;
}

export const Area: FC<Props> = ({ id, floor, area, svgData, setFocusedArea, ...props }) => {
  const timer = useRef<NodeJS.Timer | null>(null);
  const reviewCount = svgData.word.find((v) => v.id === id)?.count ?? 0;

  const handleEnter = () => {
    if (!reviewCount) return;

    timer.current = setTimeout(() => {
      timer.current = null;
      setFocusedArea({ floor, area });
    }, 100);
  };
  const handleLeave = () => {
    if (!reviewCount) return;

    if (timer.current) {
      clearTimeout(timer.current);
      setFocusedArea(null);
      return;
    }
    setFocusedArea(null);
  };
  return <AreaPath {...props} onMouseEnter={handleEnter} onMouseLeave={handleLeave}></AreaPath>;
};

const AreaPath = styled.path`
  cursor: pointer;
  position: relative;
  &:before {
    content: '';
    width: 100px;
    height: 100px;
    background-color: blue;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
