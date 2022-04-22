import React, { MouseEvent, useEffect, useState, VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { MOCK_SEAT_AREA } from 'src/api/mock/seat_areas';
import { SeatAreaType } from 'src/api/seat';
import { getSeatArea } from 'src/stores/seat';
import styled, { css } from 'styled-components';

interface PolygonPathType {
  id: string;
  d: string;
  stroke: string;
  fill: string;
  'stroke-width'?: string;
  'stroke-dasharray'?: string;
  count?: number;
}

interface WordPathType {
  id: string;
  d: string;
  fill: string;
}
interface SVGDataType {
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

/** component */
export const Seats: VFC<Props> = ({ hallId, data, className }) => {
  const [svgData, setSvgData] = useState(data);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [polygonPosition, setPolygonPosition] = useState<DOMRect | null>(null);
  const seatArea = useRecoilValue(getSeatArea(hallId));

  const { width, height, viewBox, xmlns, polygon, word } = svgData;

  useEffect(() => {
    if (!mock) return;

    const getReivewCount = (id: string) => {
      const floor = Number(id.split('-')[0][1]);
      const area = id.split('-')[1];
      if (!area || !floor) return 0;

      return mock.find((data) => {
        return data.floor === floor && data.area === area.toUpperCase();
      })?.countReviews;
    };

    const updatedPolygons = svgData.polygon.map((data) => {
      const seatReviews = getReivewCount(data.id);

      if (seatReviews) {
        const floor = data.id.split('-')[0].split('')[1];
        const style = {
          fill: FLOOR_COLOR[floor] ?? data.fill,
          stroke: 'none',
          'stroke-width': 'none',
          'stroke-dasharray': 'none',
        };
        return { ...data, ...style, count: seatReviews };
      }
      return data;
    });

    const updatedWords = svgData.word.map((data) => {
      if (getReivewCount(data.id)) {
        return { ...data, fill: '#FFF' };
      }
      return data;
    });

    setSvgData({ ...svgData, polygon: updatedPolygons, word: updatedWords });
  }, []);

  const showComment = () => setIsCommentOpen(true);
  const hideComment = () => setIsCommentOpen(false);

  const handlePolygonEnter = (e: MouseEvent) => {
    if (!isCommentOpen) showComment();
    const polygon = e.target as SVGPathWithId;
    const id = polygon.id;
    setReviewCount(polygon.dataset.review ? +polygon.dataset.review : 0);
    const wordPath = document.querySelectorAll(`path[id="${id}"]`)[1];

    if (!wordPath) return;
    setPolygonPosition(wordPath.getBoundingClientRect());
  };

  const handlePolygonClick = (e: MouseEvent) => {
    /** 리뷰 리스트 모달 */
  };

  const SVGPolygons = polygon.map((data) => (
    <PolygonPath
      key={data.id}
      id={data.id}
      d={data.d}
      data-review={data.count}
      fill={data.fill}
      stroke={data.stroke}
      strokeWidth={data['stroke-width']}
      strokeDasharray={data['stroke-dasharray']}
      onMouseEnter={handlePolygonEnter}
      onMouseLeave={hideComment}
      onClick={handlePolygonClick}
    />
  ));

  const SVGWords = word.map((data) => (
    <WordPath key={data.id} id={data.id} d={data.d} fill={data.fill} onMouseEnter={showComment} />
  ));

  return (
    <>
      {!!reviewCount && (
        <SeatComment isCommentOpen={isCommentOpen} onMouseEnter={showComment} polygonPosition={polygonPosition}>
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
