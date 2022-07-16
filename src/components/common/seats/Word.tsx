import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { compareSeatState } from 'src/stores/compare';
import styled from 'styled-components';
import { SelectedPositionType } from './MiniSeats';

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
  setReviewCount?: Dispatch<SetStateAction<number>>;
  handleSeatAreaClick: (floor?: number | null, area?: string | null, seatAreaId?: number) => void;
  hoveredArea?: SVGInfoType | null;
  setHoveredArea?: Dispatch<SetStateAction<SVGInfoType | null>>;
  setHoverAreaPosition?: Dispatch<SetStateAction<DOMRect | null>>;
  setSelectedPosition?: Dispatch<SetStateAction<SelectedPositionType>>;
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
  setSelectedPosition,
  seatAreaId,
  ...props
}) => {
  const compareSeat = useRecoilValue(compareSeatState);
  const wordRef = useRef<SVGPathElement>(null);

  const areaData = svgData.word.find((v) => v.id === id);

  const reviewCount = areaData?.count ?? 0;

  useEffect(() => {
    if (floor !== hoveredArea?.floor || area !== hoveredArea.area || !wordRef.current) return;

    setReviewCount?.(reviewCount);
    setHoverAreaPosition?.(wordRef.current.getBoundingClientRect());
  }, [hoveredArea]);

  useEffect(() => {
    if (!setSelectedPosition || !wordRef.current) return;

    const leftCompareSeat = compareSeat.left;
    const rightCompareSeat = compareSeat.right;

    setSelectedPosition((data) => {
      if (!wordRef.current) return data;
      if (floor === leftCompareSeat?.floor && area === leftCompareSeat?.area) {
        return { ...data, left: wordRef.current.getBoundingClientRect() };
      }
      if (floor === rightCompareSeat?.floor && area === rightCompareSeat?.area) {
        return { ...data, right: wordRef.current.getBoundingClientRect() };
      }
      return data;
    });
  }, [compareSeat]);

  return (
    <WordPath
      ref={wordRef}
      onClick={() => handleSeatAreaClick(floor, area, seatAreaId)}
      onMouseEnter={() => {
        setHoveredArea?.(hoveredArea ?? null);
      }}
      {...props}></WordPath>
  );
};

const WordPath = styled.path`
  user-select: none;
`;
