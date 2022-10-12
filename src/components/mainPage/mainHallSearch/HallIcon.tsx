import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import * as icons from 'src/components/common/icon/iconPath';
import Icon from 'src/components/common/icon/Icon';
import useModal from 'src/hooks/useModal';
import AlertModal from 'src/components/common/modal/AlertModal';
import { ROUTE } from 'src/route';

interface Props {
  name: string;
  iconName: string;
  concertHallId?: number;
}

export const HallIcon: FC<Props> = ({ name, iconName, concertHallId }) => {
  const { openModal } = useModal();
  const router = useRouter();

  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const handleClick = () => {
    if (concertHallId === undefined) {
      openModal(<AlertModal type="NO_SEAT" />);
      return;
    }

    router.push(`${ROUTE.SEAT}?hallId=${concertHallId}`);
  };

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };
  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

  const hallIconName = isMouseEnter
    ? (`icon${iconName}Hover` as keyof typeof icons)
    : (`icon${iconName}` as keyof typeof icons);

  return (
    <Wrapper onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="icon">
        <Icon name={hallIconName} />
      </div>
      <div>{name}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 12px;
  font-weight: 700;
  color: #376f77;

  z-index: 10;

  cursor: pointer;

  .icon {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    width: 110px;
    height: 35px;
    margin-bottom: 14px;
  }
`;
