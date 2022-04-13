import React, { MouseEvent, useState, VFC } from 'react';
import styled, { css } from 'styled-components';

interface PolygonPathType {
  id: string;
  d: string;
  stroke: string;
  fill: string;
  'stroke-width'?: string;
  'stroke-dasharray'?: string;
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

interface PolygonPositionType {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

/** component */
export const Seats: VFC<Props> = ({ data, className }) => {
  const [svgData, setSvgData] = useState(data);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [polygonPosition, setPolygonPosition] = useState<DOMRect | null>(null);

  const { width, height, viewBox, xmlns, polygon, word } = svgData;

  const handlePolygonClick = (e: MouseEvent) => {
    if (!isCommentOpen) setIsCommentOpen(true);
    const polygon = e.target as SVGPathWithId;
    const id = polygon.id;

    const wordPath = document.querySelectorAll(`path[id="${id}"]`)[1];

    if (!wordPath) return;
    setPolygonPosition(wordPath.getBoundingClientRect());
  };

  const SVGPolygons = polygon.map((data) => (
    <PolygonPath
      key={data.id}
      id={data.id}
      d={data.d}
      fill={data.fill}
      stroke={data.stroke}
      strokeWidth={data['stroke-width']}
      strokeDasharray={data['stroke-dasharray']}
      onClick={handlePolygonClick}
    />
  ));

  const SVGWords = word.map((data) => <WordPath key={data.id} id={data.id} d={data.d} fill={data.fill} />);

  return (
    <>
      {isCommentOpen && (
        <SeatComment polygonPosition={polygonPosition}>
          3건
          <div className="arrow"></div>
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
const WordPath = styled.path``;
