import React, { FC } from 'react';
import useModal from 'src/hooks/useModal';
import styled, { css } from 'styled-components';
import { Button } from '../button/Button';
import Icon from '../icon/Icon';
import { ModalHOC } from './ModalHOC';

type AlertType = 'NO_SEAT' | 'NO_PHOTO' | 'NO_FUNC';

interface Props {
  type: AlertType;
}

const ALERT_DATA = {
  NO_SEAT: {
    icon: <Icon name="iconAlertSeat" />,
    mainMsg: '좌석 리뷰가 없습니다!',
    subMsg: ['죄송해요. 아직 데이터를 준비하지 못했어요😢'],
  },
  NO_PHOTO: {
    icon: <Icon name="iconAlertPhoto" />,
    mainMsg: '사진이 부족해요!',
    subMsg: ['사진을 최소 1개 업로드 해주세요.'],
  },
  NO_FUNC: {
    icon: <Icon name="iconAlertFunc" />,
    mainMsg: '해당 기능은 준비 중입니다.',
    subMsg: ['불편을 드려 죄송해요🙏', '열심히 개발하겠습니다!'],
  },
};

export const AlertModal: FC<Props> = ({ type }) => {
  const subMsgList = ALERT_DATA[type].subMsg;
  return (
    <Wrapper type={type}>
      <Icon name="iconAlertTopBar" className="topbar" />
      <div className="icon">{ALERT_DATA[type].icon}</div>
      <p className="mainMsg">{ALERT_DATA[type].mainMsg}</p>
      <div className="subMsg">
        {subMsgList.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>
      <Button className="button" bgColor="red">
        알았어요.
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ type: AlertType }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 295px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(219, 197, 197, 0.75);
  background-color: ${({ theme }) => theme.color.white};
  z-index: 9999;
  overflow: hidden;

  .topbar {
    position: absolute;
    top: 0;
  }

  .icon {
    display: flex;
    align-items: flex-end;
    height: 125px;
  }

  .mainMsg {
    margin-top: 15px;
    margin-bottom: 8px;
    line-height: 28px;
    font-weight: 700;
  }

  .subMsg {
    height: 36px;
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.fontColor.gray};
  }
`;
