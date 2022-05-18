import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import useModal from 'src/hooks/useModal';
import { selectSeatAtom } from 'src/stores/seat';
import styled from 'styled-components';
import { AlertModal } from '../modal/AlertModal';
import ReviewListModal from '../modal/ReviewListModal';
import { SVGDataType, SVGInfoType } from './Seats';

export interface AreaPathType {
  id: string;
  floor: number | null;
  area: string | null;
  d: string;
  stroke: string;
  fill: string;
  'stroke-width'?: string;
  'stroke-dasharray'?: string;
  seatAreaId?: number;
}

interface Props extends AreaPathType {
  hallId: number;
  svgData: SVGDataType;
  setFocusedArea: Dispatch<SetStateAction<SVGInfoType | null>>;
  strokeDasharray?: string;
  strokeWidth?: string;
}

export const Area: FC<Props> = ({
  hallId,
  id,
  floor,
  area,
  svgData,
  setFocusedArea,
  strokeDasharray,
  strokeWidth,
  ...props
}) => {
  const setSelectSeat = useSetRecoilState(selectSeatAtom);
  const { openModal } = useModal();
  const timer = useRef<NodeJS.Timer | null>(null);
  const areaData = svgData.word.find((v) => v.id === id);

  const reviewCount = areaData?.count ?? 0;
  /** STAGE, FLOOR 등은 seatAreaId가 0 */
  const seatAreaId = areaData?.seatAreaId ?? 0;

  const handleClick = () => {
    if (!floor || !area) return;

    setSelectSeat({ floor: floor.toString(), area });
    if (!reviewCount) {
      openModal(<AlertModal type="NO_SEAT" />);
    } else {
      openModal(<ReviewListModal hallId={hallId} seatAreaId={seatAreaId} />);
    }
  };

  const handleEnter = () => {
    if (!reviewCount) return;

    timer.current = setTimeout(() => {
      timer.current = null;
      setFocusedArea({ floor, area });
    }, 100);
  };
  const handleLeave = () => {
    if (!reviewCount) return;

    if (timer.current) {
      clearTimeout(timer.current);
      setFocusedArea(null);
      return;
    }
    setFocusedArea(null);
  };

  return (
    <AreaPath
      {...props}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      strokeDasharray={strokeDasharray}
      strokeWidth={strokeWidth}></AreaPath>
  );
};

const AreaPath = styled.path`
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
