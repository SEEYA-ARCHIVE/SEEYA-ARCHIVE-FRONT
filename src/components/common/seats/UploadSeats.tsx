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
  seatsData: SeatAreaType[];
  onChangeSeatAreaId: (value: number) => void;
}

export interface SVGInfoType {
  floor: number | null;
  area: string | null;
}

const SELECTED_COLOR = '#13ACC1';

/** component */

export type SelectedPositionType = { left: DOMRect | null; right: DOMRect | null };

export const UploadSeats: VFC<Props> = ({ onChangeSeatAreaId, hallId, data, className, seatsData }) => {
  const [svgData, setSvgData] = useState(data);
  const [selected, setSelected] = useState(0);
  const { width, height, viewBox, xmlns, area, word } = svgData;

  const getReivewCount = ({ floor, area }: SVGInfoType) => {
    if (!area || !floor) return null;

    const currentSeatData = seatsData.find((data) => {
      return data.floor === floor && data.area === area.toUpperCase();
    });

    return { seatAreaId: currentSeatData?.seatAreaId, count: currentSeatData?.countReviews };
  };

  const setSeatStyle = () => {
    const updatedArea = svgData.area.map((data) => {
      const seatReviews = getReivewCount(data);

      if (selected === data.seatAreaId) {
        const style = {
          fill: SELECTED_COLOR,
          stroke: 'none',
          'stroke-width': 'none',
          'stroke-dasharray': 'none',
        };
        return { ...data, ...style, seatAreaId: seatReviews?.seatAreaId };
      } else {
        const style = {
          stroke: '#C4C4C4',
          fill: '#EFEFEF',
          'stroke-width': '0.7',
          'stroke-dasharray': '2 2',
        };
        return { ...data, ...style, seatAreaId: seatReviews?.seatAreaId };
      }
    });

    const updatedWords = svgData.word.map((data) => {
      const seatReviews = getReivewCount(data);

      if (selected === data.seatAreaId) {
        const style = {
          fill: '#FFF',
        };
        return { ...data, ...style, seatAreaId: seatReviews?.seatAreaId };
      } else {
        const style = {
          fill: '#C4C4C4',
        };
        return { ...data, ...style, seatAreaId: seatReviews?.seatAreaId };
      }
    });

    setSvgData({ ...svgData, area: updatedArea, word: updatedWords });
  };

  const handleSeatAreaClick = (floor?: number | null, area?: string | null, seatAreaId?: number) => {
    if (!floor || !area || !seatAreaId) return;
    setSelected(seatAreaId);
  };

  useEffect(() => {
    setSeatStyle();
    onChangeSeatAreaId(selected);
  }, [seatsData, selected]);

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
