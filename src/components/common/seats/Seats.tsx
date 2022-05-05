import React, { MouseEvent, useEffect, useState, VFC } from 'react';
import styled, { css } from 'styled-components';

import { SeatAreaType } from 'src/api/seat';
import { getSeatArea } from 'src/stores/seat';
import { Area, AreaPathType } from './Area';
import { Word, WordPathType } from './Word';

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
export const Seats: VFC<Props> = ({ hallId, seatsData, data, className }) => {
  const [svgData, setSvgData] = useState(data);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [areaPosition, setAreaPosition] = useState<DOMRect | null>(null);

  const [focusedArea, setFocusedArea] = useState<SVGInfoType | null>(null);
  /**
   * useRecoilValue는 Suspense를 NextJS에서 못써서 사용 못한다.
   * 그러면 불편할텐데.. 다른 라이브러리 고민도 할만할 듯
   */

  const { width, height, viewBox, xmlns, area, word } = svgData;

  const showComment = () => setIsCommentOpen(true);
  const hideComment = () => setIsCommentOpen(false);

  const getReivewCount = ({ floor, area }: SVGInfoType) => {
    if (!area || !floor) return 0;
    /**
     * TODO: 비동기 값적용
     */
    return seatsData.find((data) => {
      return data.floor === floor && data.area === area.toUpperCase();
    })?.countReviews;
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

      if (seatReviews && data.floor) {
        const style = {
          fill: FLOOR_COLOR[data.floor] ?? data.fill,
          stroke: 'none',
          'stroke-width': 'none',
          'stroke-dasharray': 'none',
        };
        return { ...data, ...style };
      }
      window.k = seatsData;
      console.log({ seatsData, svgData, updatedArea });
      return data;
    });

    const updatedWords = svgData.word.map((data) => {
      const seatReviews = getReivewCount(data);

      if (seatReviews) {
        return { ...data, fill: '#FFF', count: seatReviews };
      }
      return data;
    });

    setSvgData({ ...svgData, area: updatedArea, word: updatedWords });
  };

  useEffect(() => {
    if (focusedArea) {
      showComment();
      setAreaOpacity(focusedArea);
    } else {
      hideComment();
      setSeatStyle();
    }
  }, [focusedArea]);

  /**
   * TODO: 비동기 값적용
   */
  useEffect(() => {
    if (!seatsData) return;
    setSeatStyle();
  }, []);

  const SVGArea = area.map((data) => (
    <Area key={data.id} svgData={svgData} setFocusedArea={setFocusedArea} {...data} />
  ));

  const SVGWords = word.map((data) => (
    <Word
      key={data.id}
      focusedArea={focusedArea}
      setFocusedArea={setFocusedArea}
      svgData={svgData}
      setReviewCount={setReviewCount}
      setAreaPosition={setAreaPosition}
      {...data}
    />
  ));

  return (
    <>
      {!!reviewCount && (
        <SeatComment
          isCommentOpen={isCommentOpen}
          areaPosition={areaPosition}
          onMouseEnter={() => {
            setFocusedArea(focusedArea);
          }}>
          {reviewCount}건<div className="arrow"></div>
        </SeatComment>
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
  display: inline-block;

  & svg {
    width: auto;
    height: 100%;

    display: block;
  }
`;

const SeatComment = styled.div<{ isCommentOpen: boolean; areaPosition: DOMRect | null }>`
  cursor: pointer;
  visibility: ${({ isCommentOpen }) => (isCommentOpen ? 'visible' : 'hidden')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: ${({ theme }) => theme.color.purple};
  color: ${({ theme }) => theme.fontColor.white};
  width: 34px;
  height: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  font-size: 9px;
  font-weight: 700;
  ${({ areaPosition }) => {
    return (
      areaPosition &&
      css`
        top: ${areaPosition.top - areaPosition.height / 2 - 34}px;
        left: ${areaPosition.left + areaPosition.width / 2 - 15}px;
      `
    );
  }}
  .arrow {
    background-color: ${({ theme }) => theme.color.purple};
    position: absolute;
    bottom: -3px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border-radius: 2px;
  }
  z-index: 9999;
`;
