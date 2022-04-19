import React, { MouseEvent, useEffect, useState, VFC } from 'react';
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
  data: SVGDataType;
  className?: string;
}

interface SVGPathWithId extends SVGPathElement {
  id: string;
}

const mock = [
  { id: 'f3-a1', count: 3 },
  { id: 'f3-a2', count: 2 },
  { id: 'f3-a3', count: 1 },
  { id: 'f3-a4', count: 7 },
  { id: 'f2-d1', count: 1 },
  { id: 'f2-d2', count: 2 },
  { id: 'f2-g', count: 3 },
  { id: 'f2-h', count: 3 },
  { id: 'f2-b1', count: 3 },
  { id: 'f3-e1', count: 2 },
  { id: 'f3-e3', count: 5 },
];

const mockData = {
  data: [{ floor: 2, sector: 'a1', count: 3 }],
};

const FLOOR_COLOR: Record<string, string> = {
  2: '#FFB118',
  3: '#13ACC1',
};

/** component */
export const Seats: VFC<Props> = ({ data, className }) => {
  const [svgData, setSvgData] = useState(data);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [polygonPosition, setPolygonPosition] = useState<DOMRect | null>(null);
  const [reviewCount, setReviewCount] = useState(0);

  const { width, height, viewBox, xmlns, polygon, word } = svgData;

  useEffect(() => {
    const getReivewCount = (id: string, reviewData: { id: string; count: number }[]) => {
      /** TODO: API 리스폰스 정해지면 수정필요 */
      return reviewData.find((data) => data.id === id)?.count;
    };
    const updatedPolygons = svgData.polygon.map((data) => {
      const seatReviews = getReivewCount(data.id, mock);
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
      if (getReivewCount(data.id, mock)) {
        return { ...data, fill: '#FFF' };
      }
      return data;
    });

    setSvgData({ ...svgData, polygon: updatedPolygons, word: updatedWords });
  }, []);

  const handlePolygonEnter = (e: MouseEvent) => {
    if (!isCommentOpen) setIsCommentOpen(true);
    console.log('!!!');
    const polygon = e.target as SVGPathWithId;
    const id = polygon.id;
    setReviewCount(polygon.dataset.review ? +polygon.dataset.review : 0);
    const wordPath = document.querySelectorAll(`path[id="${id}"]`)[1];

    if (!wordPath) return;
    setPolygonPosition(wordPath.getBoundingClientRect());
  };

  const handlePolygonLeave = (e: MouseEvent) => setIsCommentOpen(false);
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
      // onMouseOver={handlePolygonEnter}
      // onMouseLeave={handlePolygonLeave}
      onClick={handlePolygonEnter}
    />
  ));

  const SVGWords = word.map((data) => <WordPath key={data.id} id={data.id} d={data.d} fill={data.fill} />);

  return (
    <>
      {isCommentOpen && !!reviewCount && (
        <SeatComment polygonPosition={polygonPosition}>
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
const SeatComment = styled.div<{ polygonPosition: DOMRect | null }>`
  cursor: pointer;
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
`;
const WordPath = styled.path`
  user-select: none;
`;
