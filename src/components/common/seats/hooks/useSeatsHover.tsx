import { useEffect, useState } from 'react';
import { SVGInfoType } from '../Seats';

export const useSeatsHover = () => {
  const [isHover, setIsHover] = useState(false);

  const [hoverAreaPosition, setHoverAreaPosition] = useState<DOMRect | null>(null);
  const [hoveredArea, setHoveredArea] = useState<SVGInfoType | null>(null);

  useEffect(() => {
    if (hoveredArea) {
      setIsHover(true);
    } else {
      setIsHover(false);
    }
  }, [hoveredArea]);

  return { isHover, hoverAreaPosition, setHoverAreaPosition, setHoveredArea };
};
