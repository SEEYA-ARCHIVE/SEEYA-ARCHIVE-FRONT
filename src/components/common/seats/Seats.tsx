import React, { MouseEvent, useEffect, useState, VFC } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { MOCK_SEAT_AREA } from 'src/api/mock/seat_areas';
import { SeatAreaType } from 'src/api/seat';
import { getSeatArea } from 'src/stores/seat';
import styled, { css } from 'styled-components';
import { Area, PolygonPathType } from './Area';
import { Word, WordPathType } from './Word';

export interface SVGDataType {
  width: number;
  height: number;
  viewBox: string;
  xmlns: string;
  polygon: PolygonPathType[];
  word: WordPathType[];
}
interface Props {
  hallId: number;
  data: SVGDataType;
  className?: string;
}

interface SVGPathWithId extends SVGPathElement {
  id: string;
}

const mock = MOCK_SEAT_AREA;

const FLOOR_COLOR: Record<string, string> = {
  2: '#FFB118',
  3: '#13ACC1',
};
/**
 * 1. 코멘트 띄우기
 * - isCommentOpen
 * - reviewCount => word에서 진행
 * 2. 색깔 변경하기
 * - setSvgData
 */
/** component */
export const Seats: VFC<Props> = ({ hallId, data, className }) => {
  const [svgData, setSvgData] = useState(data);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [polygonPosition, setPolygonPosition] = useState<DOMRect | null>(null);

  const [focusedArea, setFocusedArea] = useState<string | null>(null);
  /**
   * useRecoilValue는 Suspense를 NextJS에서 못써서 사용 못한다.
   * 그러면 불편할텐데.. 다른 라이브러리 고민도 할만할 듯
   */
  const seatArea = useRecoilValueLoadable(getSeatArea(hallId));

  const { width, height, viewBox, xmlns, polygon, word } = svgData;

  const showComment = () => setIsCommentOpen(true);
  const hideComment = () => setIsCommentOpen(false);

  useEffect(() => {
    if (focusedArea) {
      showComment();
    } else {
      hideComment();
    }
  }, [focusedArea]);

  useEffect(() => {
    if (!mock) return;

    const getFloorFromId = (id: string) => Number(id.split('-')[0][1]);
    const getAreaFromId = (id: string) => id.split('-')[1];
    const getReivewCount = (id: string) => {
      const floor = getFloorFromId(id);
      const area = getAreaFromId(id);
      if (!area || !floor) return 0;

      return mock.find((data) => {
        return data.floor === floor && data.area === area.toUpperCase();
      })?.countReviews;
    };

    const updatedPolygons = svgData.polygon.map((data) => {
      if (getReivewCount(data.id)) {
        const floor = getFloorFromId(data.id);
        const style = {
          fill: FLOOR_COLOR[floor] ?? data.fill,
          stroke: 'none',
          'stroke-width': 'none',
          'stroke-dasharray': 'none',
        };
        return { ...data, ...style };
      }
      return data;
    });

    const updatedWords = svgData.word.map((data) => {
      const seatReviews = getReivewCount(data.id);

      if (seatReviews) {
        return { ...data, fill: '#FFF', count: seatReviews };
      }
      return data;
    });

    setSvgData({ ...svgData, polygon: updatedPolygons, word: updatedWords });
  }, []);

  const SVGPolygons = polygon.map((data) => <Area key={data.id} {...data} setFocusedArea={setFocusedArea} />);

  const SVGWords = word.map((data) => (
    <Word
      key={data.id}
      focusedArea={focusedArea}
      setFocusedArea={setFocusedArea}
      svgData={svgData}
      setReviewCount={setReviewCount}
      setPolygonPosition={setPolygonPosition}
      {...data}
    />
  ));

  return (
    <>
      {!!reviewCount && (
        <SeatComment
          isCommentOpen={isCommentOpen}
          polygonPosition={polygonPosition}
          onMouseEnter={() => {
            setFocusedArea(focusedArea);
          }}>
          {reviewCount}건<div className="arrow"></div>
        </SeatComment>
      )}
      <SVGWrap className={className}>
        <svg width={width} height={height} viewBox={viewBox} xmlns={xmlns}>
          {SVGPolygons}
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

const SeatComment = styled.div<{ isCommentOpen: boolean; polygonPosition: DOMRect | null }>`
  cursor: pointer;
  visibility: ${({ isCommentOpen }) => (isCommentOpen ? 'visible' : 'hidden')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: ${({ theme }) => theme.color.purple};
  color: ${({ theme }) => theme.fontColor.white};
  width: 34px;
  height: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  font-size: 9px;
  font-weight: 700;
  ${({ polygonPosition }) => {
    return (
      polygonPosition &&
      css`
        top: ${polygonPosition.top - polygonPosition.height / 2 - 34}px;
        left: ${polygonPosition.left + polygonPosition.width / 2 - 15}px;
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

const PolygonPath = styled.path`
  cursor: pointer;
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
const WordPath = styled.path`
  user-select: none;
`;
