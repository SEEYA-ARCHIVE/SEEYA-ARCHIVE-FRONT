import React, { Dispatch, FC, SetStateAction, useRef } from 'react';

import styled from 'styled-components';
import { SVGDataType, SVGInfoType } from './Seats';

export interface AreaPathType {
  id?: string;
  floor: number | null;
  area: string | null;
  d: string;
  stroke: string;
  fill: string;
  'stroke-width'?: string;
  'stroke-dasharray'?: string;
  seatAreaId?: number;
}

interface Props extends AreaPathType {
  hallId: number;
  svgData: SVGDataType;
  setHoveredArea?: Dispatch<SetStateAction<SVGInfoType | null>>;
  strokeDasharray?: string;
  strokeWidth?: string;
  handleSeatAreaClick: (floor?: number | null, area?: string | null, seatAreaId?: number) => void;
}

export const Area: FC<Props> = ({
  hallId,
  id,
  floor,
  area,
  svgData,
  setHoveredArea,
  strokeDasharray,
  strokeWidth,
  handleSeatAreaClick,
  seatAreaId,
  ...props
}) => {
  const timer = useRef<NodeJS.Timer | null>(null);
  const areaData = svgData.word.find((v) => v.id === id);
  const reviewCount = areaData?.count ?? 0;

  const handleEnter = () => {
    if (!reviewCount) return;

    timer.current = setTimeout(() => {
      timer.current = null;
      setHoveredArea?.({ floor, area });
    }, 100);
  };
  const handleLeave = () => {
    if (!reviewCount) return;

    if (timer.current) {
      clearTimeout(timer.current);
      setHoveredArea?.(null);
      return;
    }
    setHoveredArea?.(null);
  };

  return (
    <AreaPath
      {...props}
      onClick={() => handleSeatAreaClick(floor, area, seatAreaId)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      strokeDasharray={strokeDasharray}
      strokeWidth={strokeWidth}
      noSelect={!floor || !area}></AreaPath>
  );
};

const AreaPath = styled.path<{ noSelect: boolean }>`
  cursor: ${({ noSelect }) => (noSelect ? 'auto' : 'pointer')};

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
