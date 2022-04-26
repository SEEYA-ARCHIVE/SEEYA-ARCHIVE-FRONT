import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { SVGDataType, SVGInfoType } from './Seats';

export interface WordPathType {
  id: string;
  floor: number | null;
  area: string | null;
  d: string;
  fill: string;
  count?: number;
}

interface Props extends WordPathType {
  focusedArea: SVGInfoType | null;
  setFocusedArea: Dispatch<SetStateAction<SVGInfoType | null>>;
  svgData: SVGDataType;
  setReviewCount: Dispatch<SetStateAction<number>>;
  setAreaPosition: Dispatch<SetStateAction<DOMRect | null>>;
}

export const Word: FC<Props> = ({
  id,
  floor,
  area,
  svgData,
  setReviewCount,
  setAreaPosition,
  focusedArea,
  setFocusedArea,
  ...props
}) => {
  const wordRef = useRef<SVGPathElement>(null);

  const reviewCount = svgData.word.find((v) => v.id === id)?.count ?? 0;

  useEffect(() => {
    if (floor !== focusedArea?.floor || area !== focusedArea.area || !wordRef.current) return;

    setReviewCount(reviewCount);
    setAreaPosition(wordRef.current.getBoundingClientRect());
  }, [focusedArea]);

  return (
    <WordPath
      ref={wordRef}
      onMouseEnter={() => {
        setFocusedArea(focusedArea);
      }}
      {...props}></WordPath>
  );
};

const WordPath = styled.path`
  user-select: none;
`;
