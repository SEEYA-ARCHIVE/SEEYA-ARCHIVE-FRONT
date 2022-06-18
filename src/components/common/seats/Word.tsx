import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { SVGDataType, SVGInfoType } from './Seats';

export interface WordPathType {
  id: string;
  floor: number | null;
  area: string | null;
  d: string;
  fill: string;
  seatAreaId?: number;
  count?: number;
}

interface Props extends WordPathType {
  hallId: number;
  focusedArea: SVGInfoType | null;
  setFocusedArea: Dispatch<SetStateAction<SVGInfoType | null>>;
  svgData: SVGDataType;
  setReviewCount: Dispatch<SetStateAction<number>>;
  setAreaPosition: Dispatch<SetStateAction<DOMRect | null>>;
  handleSeatAreaClick: (floor?: number | null, area?: string | null) => void;
}

export const Word: FC<Props> = ({
  hallId,
  id,
  floor,
  area,
  svgData,
  setReviewCount,
  setAreaPosition,
  focusedArea,
  setFocusedArea,
  handleSeatAreaClick,
  ...props
}) => {
  const wordRef = useRef<SVGPathElement>(null);

  const areaData = svgData.word.find((v) => v.id === id);

  const reviewCount = areaData?.count ?? 0;

  useEffect(() => {
    if (floor !== focusedArea?.floor || area !== focusedArea.area || !wordRef.current) return;

    setReviewCount(reviewCount);
    setAreaPosition(wordRef.current.getBoundingClientRect());
  }, [focusedArea]);

  return (
    <WordPath
      ref={wordRef}
      onClick={() => handleSeatAreaClick(floor, area)}
      onMouseEnter={() => {
        setFocusedArea(focusedArea);
      }}
      {...props}></WordPath>
  );
};

const WordPath = styled.path`
  user-select: none;
`;
