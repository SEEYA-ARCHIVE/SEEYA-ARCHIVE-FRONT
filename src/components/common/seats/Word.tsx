import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import useModal from 'src/hooks/useModal';
import styled, { css } from 'styled-components';
import { AlertModal } from '../modal/AlertModal';
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
  const { openModal, closeCurrentModal } = useModal();
  const wordRef = useRef<SVGPathElement>(null);

  const reviewCount = svgData.word.find((v) => v.id === id)?.count ?? 0;

  const handleClick = () => {
    if (!reviewCount) {
      openModal(<AlertModal type="NO_SEAT" onClick={closeCurrentModal} />);
    }
  };

  useEffect(() => {
    if (floor !== focusedArea?.floor || area !== focusedArea.area || !wordRef.current) return;

    setReviewCount(reviewCount);
    setAreaPosition(wordRef.current.getBoundingClientRect());
  }, [focusedArea]);

  return (
    <WordPath
      ref={wordRef}
      onClick={handleClick}
      onMouseEnter={() => {
        setFocusedArea(focusedArea);
      }}
      {...props}></WordPath>
  );
};

const WordPath = styled.path`
  user-select: none;
`;
