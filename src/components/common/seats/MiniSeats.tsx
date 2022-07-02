import React, { useEffect, useState, VFC } from 'react';
import styled, { css } from 'styled-components';

import { SeatAreaType } from 'src/api/seat';
import { Area, AreaPathType } from './Area';
import { Word, WordPathType } from './Word';
import { useSetRecoilState } from 'recoil';
import useModal from 'src/hooks/useModal';
import AlertModal from '../modal/AlertModal';
import ReviewListModal from '../modal/ReviewListModal';
import { SeatsFloorInfo } from './SeatsFloorInfo';
import { useSeatsHover } from './hooks/useSeatsHover';

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

const OPACITY_FLOOR_COLOR: Record<string, string> = {
  1: '#ffcd68',
  2: '#A8CBCF',
};
/**
 * 1. 코멘트 띄우기
 * - isCommentOpen
 * - reviewCount => word에서 진행
 * 2. 색깔 변경하기
 * - setSvgData
 */
/** component */
export const MiniSeats: VFC<Props> = ({ hallId, seatsData, data, className }) => {
  const { openModal } = useModal();

  const [svgData, setSvgData] = useState(data);
  const [reviewCount, setReviewCount] = useState(0);

  const { width, height, viewBox, xmlns, area, word } = svgData;

  const getReivewCount = ({ floor, area }: SVGInfoType) => {
    if (!area || !floor) return null;

    const currentSeatData = seatsData.find((data) => {
      return data.floor === floor && data.area === area.toUpperCase();
    });

    return { seatAreaId: currentSeatData?.seatAreaId, count: currentSeatData?.countReviews };
  };

  const setAreaOpacity = ({ floor, area }: SVGInfoType) => {
    if (!floor || !area) return;

    const updatedArea = svgData.area.map((data) => {
      if (data.floor !== floor || data.area !== area) return data;

      const style = {
        fill: OPACITY_FLOOR_COLOR[floor] ?? data.fill,
        stroke: 'none',
        'stroke-width': 'none',
        'stroke-dasharray': 'none',
      };
      return { ...data, ...style };
    });

    setSvgData({ ...svgData, area: updatedArea });
  };

  const setSeatStyle = () => {
    const updatedArea = svgData.area.map((data) => {
      const seatReviews = getReivewCount(data);

      if (seatReviews?.count && data.floor) {
        const style = {
          fill: FLOOR_COLOR[data.floor] ?? data.fill,
          stroke: 'none',
          'stroke-width': 'none',
          'stroke-dasharray': 'none',
        };
        return { ...data, ...style, seatAreaId: seatReviews.seatAreaId };
      }

      return { ...data, seatAreaId: seatReviews?.seatAreaId };
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

  const handleSeatAreaClick = (floor?: number | null, area?: string | null) => {
    if (!floor || !area) return;

    const seatAreaId = getReivewCount({ floor, area })?.seatAreaId ?? 0;

    if (!reviewCount) {
    } else {
      openModal(<ReviewListModal hallId={hallId} seatAreaId={seatAreaId} />);
    }
  };

  useEffect(() => {
    if (!seatsData) return;
    setSeatStyle();
  }, []);

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
      setReviewCount={setReviewCount}
      handleSeatAreaClick={handleSeatAreaClick}
      {...data}
    />
  ));

  return (
    <>
      <SVGWrap className={className}>
        <SeatsFloorInfo />
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
  display: flex;
  flex-direction: column;
  align-items: center;

  & svg {
    width: auto;
    height: 100%;

    display: block;
  }
`;
