import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import styled from 'styled-components';

export interface PolygonPathType {
  id: string;
  d: string;
  stroke: string;
  fill: string;
  'stroke-width'?: string;
  'stroke-dasharray'?: string;
}

interface Props extends PolygonPathType {
  setFocusedArea: Dispatch<SetStateAction<string | null>>;
}

export const Area: FC<Props> = ({ id, setFocusedArea, ...props }) => {
  const timer = useRef<NodeJS.Timer | null>(null);

  const handleEnter = () => {
    timer.current = setTimeout(() => {
      timer.current = null;
      console.log(1);
      setFocusedArea(id);
    }, 100);
  };
  const handleLeave = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      return;
    }
    console.log(2);
    setFocusedArea(null);
  };
  return <PolygonPath {...props} onMouseEnter={handleEnter} onMouseLeave={handleLeave}></PolygonPath>;
};

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
