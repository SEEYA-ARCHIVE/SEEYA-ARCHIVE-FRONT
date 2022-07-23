import React, { FC } from 'react';
import useModal from 'src/hooks/useModal';
import styled, { css } from 'styled-components';
import { Button } from '../button/Button';
import Icon from '../icon/Icon';

import { theme } from 'src/styles/theme';
import * as icons from 'src/components/common/icon/iconPath';

type AlertType = 'NO_SEAT' | 'NO_PHOTO' | 'NO_FUNC';

interface Props {
  type?: AlertType;
  onClick?: () => void;
  color?: keyof typeof theme.color;
  iconName?: keyof typeof icons;
  mainMsg?: string;
  subMsg?: string[];
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

const AlertModal: FC<Props> = ({ type, onClick, color = 'red', iconName, mainMsg, subMsg }) => {
  const { closeCurrentModal } = useModal();

  return (
    <Wrapper>
      {!!type ? (
        <>
          <Icon name="iconAlertTopBar" className="topbar" />
          <div className="icon">{ALERT_DATA[type].icon}</div>
          <p className="mainMsg">{ALERT_DATA[type].mainMsg}</p>
          <div className="subMsg">
            {ALERT_DATA[type].subMsg.map((msg) => (
              <p key={msg}>{msg}</p>
            ))}
          </div>
        </>
      ) : (
        <>
          <Topbar className="topbar" bgColor={color}></Topbar>
          <div className="icon">
            <Icon name={iconName || 'iconAlertFunc'} />
          </div>
          <p className="mainMsg">{mainMsg}</p>
          {subMsg && (
            <div className="subMsg">
              {subMsg?.map((msg) => (
                <p key={msg}>{msg}</p>
              ))}
            </div>
          )}
        </>
      )}
      <Button
        onClick={() => {
          onClick?.();
          closeCurrentModal();
        }}
        className="button"
        bgColor={color}>
        확인
      </Button>
    </Wrapper>
  );
};

export default AlertModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding-top: 20px;
  padding-bottom: 30px;
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
    padding-top: 30px;
    padding-bottom: 15px;
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

const Topbar = styled.div<{ bgColor: keyof typeof theme.color }>`
  height: 18px;
  width: 100%;
  background-color: ${({ bgColor }) => theme.color[bgColor]};
`;
