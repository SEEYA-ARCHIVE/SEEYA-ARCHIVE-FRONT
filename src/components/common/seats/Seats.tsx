import React, { useState, VFC } from 'react';
import styled from 'styled-components';

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

/** component */
export const Seats: VFC<Props> = ({ data, className }) => {
  const [svgData, setSvgData] = useState(data);
  const { width, height, viewBox, xmlns, polygon, word } = svgData;

  const handlePolygonClick = () => {};

  const SVGPolygons = polygon.map((data) => (
    <PolygonPath
      key={data.id}
      d={data.d}
      fill={data.fill}
      stroke={data.stroke}
      strokeWidth={data['stroke-width']}
      strokeDasharray={data['stroke-dasharray']}
    />
  ));

  const SVGWords = word.map((data) => <WordPath key={data.id} d={data.d} fill={data.fill} />);

  return (
    <SVGWrap className={className}>
      <svg width={width} height={height} viewBox={viewBox} xmlns={xmlns}>
        {SVGPolygons}
        {SVGWords}
      </svg>
    </SVGWrap>
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

const PolygonPath = styled.path``;
const WordPath = styled.path``;
