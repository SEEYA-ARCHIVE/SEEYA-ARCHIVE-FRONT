import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { SVGDataType, SVGInfoType } from './Seats';

export interface WordPathType {
  id?: string;
  floor: number | null;
  area: string | null;
  d: string;
  fill: string;
  seatAreaId?: number;
  count?: number;
}

interface Props extends WordPathType {
  hallId: number;
  svgData: SVGDataType;
  setReviewCount: Dispatch<SetStateAction<number>>;
  handleSeatAreaClick: (floor?: number | null, area?: string | null) => void;
  hoveredArea?: SVGInfoType | null;
  setHoveredArea?: Dispatch<SetStateAction<SVGInfoType | null>>;
  setHoverAreaPosition?: Dispatch<SetStateAction<DOMRect | null>>;
}

export const Word: FC<Props> = ({
  hallId,
  id,
  floor,
  area,
  svgData,
  setReviewCount,
  setHoverAreaPosition,
  hoveredArea,
  setHoveredArea,
  handleSeatAreaClick,
  ...props
}) => {
  const wordRef = useRef<SVGPathElement>(null);

  const areaData = svgData.word.find((v) => v.id === id);

  const reviewCount = areaData?.count ?? 0;

  useEffect(() => {
    if (floor !== hoveredArea?.floor || area !== hoveredArea.area || !wordRef.current) return;

    setReviewCount(reviewCount);
    setHoverAreaPosition?.(wordRef.current.getBoundingClientRect());
  }, [hoveredArea]);

  return (
    <WordPath
      ref={wordRef}
      onClick={() => handleSeatAreaClick(floor, area)}
      onMouseEnter={() => {
        setHoveredArea?.(hoveredArea ?? null);
      }}
      {...props}></WordPath>
  );
};

const WordPath = styled.path`
  user-select: none;
`;
