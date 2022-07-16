import React, { useEffect, useState, VFC } from 'react';
import styled, { css } from 'styled-components';

import { SeatAreaType } from 'src/api/seat';
import { Area, AreaPathType } from './Area';
import { Word, WordPathType } from './Word';
import { useRecoilState } from 'recoil';
import { compareSeatState } from 'src/stores/compare';

export interface SVGDataType {
  width: number;
  height: number;
  viewBox: string;
  xmlns: string;
  area: AreaPathType[];
  word: WordPathType[];
}
interface Props {
  hallId: number;
  data: SVGDataType;
  className?: string;
  seatsData: SeatAreaType[];
}

export interface SVGInfoType {
  floor: number | null;
  area: string | null;
}

const FLOOR_COLOR: Record<string, string> = {
  1: '#FFB118',
  2: '#13ACC1',
};

const SELECTED_FLOOR_COLOR = '#DF3232';
/**
 * 1. 코멘트 띄우기
 * - isCommentOpen
 * - reviewCount => word에서 진행
 * 2. 색깔 변경하기
 * - setSvgData
 */
/** component */

export type SelectedPositionType = { left: DOMRect | null; right: DOMRect | null };

export const MiniSeats: VFC<Props> = ({ hallId, seatsData, data, className }) => {
  const [svgData, setSvgData] = useState(data);

  const [compareSeat, setCompareSeat] = useRecoilState(compareSeatState);
  const [selectedPosition, setSelectedPosition] = useState<SelectedPositionType>({
    left: null,
    right: null,
  });
  const { width, height, viewBox, xmlns, area, word } = svgData;

  const getReivewCount = ({ floor, area }: SVGInfoType) => {
    if (!area || !floor) return null;

    const currentSeatData = seatsData.find((data) => {
      return data.floor === floor && data.area === area.toUpperCase();
    });

    return { seatAreaId: currentSeatData?.seatAreaId, count: currentSeatData?.countReviews };
  };

  const setSeatStyle = () => {
    const leftSelectedSeat = compareSeat.left;
    const rightSelectedSeat = compareSeat.right;

    const updatedArea = svgData.area.map((data) => {
      const seatReviews = getReivewCount(data);
      let seatData;

      if (seatReviews?.count && data.floor) {
        const style = {
          fill: FLOOR_COLOR[data.floor] ?? data.fill,
          stroke: 'none',
          'stroke-width': 'none',
          'stroke-dasharray': 'none',
        };
        seatData = { ...data, ...style, seatAreaId: seatReviews.seatAreaId };
      }

      if (
        (data.floor === leftSelectedSeat?.floor && data.area === leftSelectedSeat.area) ||
        (data.floor === rightSelectedSeat?.floor && data.area === rightSelectedSeat.area)
      ) {
        const style = {
          fill: SELECTED_FLOOR_COLOR,
          stroke: 'none',
          'stroke-width': 'none',
          'stroke-dasharray': 'none',
        };
        seatData = { ...data, ...style, seatAreaId: seatReviews?.seatAreaId };
      }

      return seatData || { ...data, seatAreaId: seatReviews?.seatAreaId };
    });

    const updatedWords = svgData.word.map((data) => {
      const seatReviews = getReivewCount(data);

      if (seatReviews?.count) {
        return { ...data, fill: '#FFF', count: seatReviews?.count, seatAreaId: seatReviews?.seatAreaId };
      }
      return { ...data, seatAreaId: seatReviews?.seatAreaId };
    });

    setSvgData({ ...svgData, area: updatedArea, word: updatedWords });
  };

  const handleSeatAreaClick = (floor?: number | null, area?: string | null, seatAreaId?: number) => {
    if (!floor || !area || !seatAreaId) return;

    const seatReviews = getReivewCount({ floor, area });

    if (!seatReviews?.count) return;

    const setCompareSeatState = (
      position: 'left' | 'right',
      data: { floor: number; area: string; hallId: number; seatAreaId: number } | null,
    ) => {
      setCompareSeat((selectedCompareSeat) => {
        if (selectedCompareSeat.left?.seatAreaId === seatAreaId) return { ...selectedCompareSeat, left: null };
        if (selectedCompareSeat.right?.seatAreaId === seatAreaId) return { ...selectedCompareSeat, right: null };

        return { ...compareSeat, [position]: data };
      });
    };

    const leftCompareSeat = compareSeat.left;
    const rightCompareSeat = compareSeat.right;

    if (!leftCompareSeat) {
      setCompareSeatState('left', { floor, area, hallId, seatAreaId });
      return;
    }
    if (leftCompareSeat && leftCompareSeat.seatAreaId === seatAreaId) {
      setCompareSeatState('left', null);
      return;
    }

    if (!rightCompareSeat) {
      setCompareSeatState('right', { floor, area, hallId, seatAreaId });
      return;
    }
    if (rightCompareSeat && rightCompareSeat.seatAreaId === seatAreaId) {
      setCompareSeatState('right', null);
      return;
    }
  };

  useEffect(() => {
    if (!seatsData) return;
    setSeatStyle();
  }, [compareSeat]);

  const SVGArea = area.map((data) => (
    <Area
      key={data.id}
      hallId={hallId}
      svgData={svgData}
      strokeDasharray={data['stroke-dasharray']}
      strokeWidth={data['stroke-width']}
      handleSeatAreaClick={handleSeatAreaClick}
      {...data}
    />
  ));

  const SVGWords = word.map((data) => (
    <Word
      key={data.id}
      hallId={hallId}
      svgData={svgData}
      handleSeatAreaClick={handleSeatAreaClick}
      setSelectedPosition={setSelectedPosition}
      {...data}
    />
  ));

  return (
    <>
      {compareSeat.left && (
        <LeftSelectMark
          selectedAreaPosition={selectedPosition.left}
          onClick={() => {
            handleSeatAreaClick(compareSeat.left?.floor, compareSeat.left?.area, compareSeat.left?.seatAreaId);
          }}>
          L
        </LeftSelectMark>
      )}
      {compareSeat.right && (
        <RightSelectMark
          selectedAreaPosition={selectedPosition.right}
          onClick={() => {
            handleSeatAreaClick(compareSeat.right?.floor, compareSeat.right?.area, compareSeat.right?.seatAreaId);
          }}>
          R
        </RightSelectMark>
      )}
      <SVGWrap className={className}>
        <svg width={width} height={height} viewBox={viewBox} xmlns={xmlns}>
          {SVGArea}
          {SVGWords}
        </svg>
      </SVGWrap>
    </>
  );
};

/** styled component */

const SVGWrap = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & svg {
    width: auto;
    height: 100%;

    display: block;
  }
`;

const SelectMark = styled.div<{ selectedAreaPosition: DOMRect | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.fontColor.white};
  width: 19px;
  height: 19px;
  border-radius: 50%;
  font-weight: 700;

  position: fixed;
  background-color: ${SELECTED_FLOOR_COLOR};
`;

const LeftSelectMark = styled(SelectMark)`
  ${({ selectedAreaPosition }) => {
    return (
      selectedAreaPosition &&
      css`
        top: ${selectedAreaPosition.top - 8}px;
        left: ${selectedAreaPosition.left - 7}px;
      `
    );
  }};
`;
const RightSelectMark = styled(SelectMark)`
  ${({ selectedAreaPosition }) => {
    return (
      selectedAreaPosition &&
      css`
        top: ${selectedAreaPosition.top - 8}px;
        left: ${selectedAreaPosition.left - 7}px;
      `
    );
  }};
`;
