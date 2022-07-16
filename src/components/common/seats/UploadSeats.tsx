import React, { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';

import { SeatAreaType } from 'src/api/seat';
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
  seatsData?: SeatAreaType[];
}

export interface SVGInfoType {
  floor: number | null;
  area: string | null;
}

const SELECTED_COLOR = '#blue';
const HOVERED_COLOR = '#green';

/** component */

export type SelectedPositionType = { left: DOMRect | null; right: DOMRect | null };

export const UploadSeats: VFC<Props> = ({ hallId, data, className }) => {
  const [svgData, setSvgData] = useState(data);
  const [selected, setSelected] = useState();
  const { width, height, viewBox, xmlns, area, word } = svgData;

  const setSeatStyle = () => {
    const updatedArea = svgData.area.map((data) => {
      let seatData = data;

      return seatData;
    });

    const updatedWords = svgData.word.map((data) => {
      const seatReviews = data;

      return { ...data, seatAreaId: seatReviews?.seatAreaId };
    });

    setSvgData({ ...svgData, area: updatedArea, word: updatedWords });
  };

  const handleSeatAreaClick = (floor?: number | null, area?: string | null, seatAreaId?: number) => {
    if (!floor || !area || !seatAreaId) return;
  };

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
    <Word key={data.id} hallId={hallId} svgData={svgData} handleSeatAreaClick={handleSeatAreaClick} {...data} />
  ));

  return (
    <>
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
