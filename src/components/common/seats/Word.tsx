import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import useModal from 'src/hooks/useModal';
import { selectSeatAtom } from 'src/stores/seat';
import styled, { css } from 'styled-components';
import { AlertModal } from '../modal/AlertModal';
import ReviewListModal from '../modal/ReviewListModal';
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
  ...props
}) => {
  const setSelectSeat = useSetRecoilState(selectSeatAtom);
  const { openModal } = useModal();
  const wordRef = useRef<SVGPathElement>(null);

  const areaData = svgData.word.find((v) => v.id === id);

  const reviewCount = areaData?.count ?? 0;
  /** STAGE, FLOOR 등은 seatAreaId가 0 */
  const seatAreaId = areaData?.seatAreaId ?? 0;

  const handleClick = () => {
    if (!floor || !area) return;

    setSelectSeat({ floor: floor.toString(), area });
    if (!reviewCount) {
      openModal(<AlertModal type="NO_SEAT" />);
    } else {
      openModal(<ReviewListModal hallId={hallId} seatAreaId={seatAreaId} />);
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
