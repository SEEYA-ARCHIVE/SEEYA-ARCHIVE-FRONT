import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../common/icon/Icon';
import { UploadFormReview } from './UploadFormReview';
import { UploadFormSeats } from './UploadFormSeats';
import { UploadImageList } from './uploadImage/UploadImageList';

interface Props {}

export const UploadForm: FC<Props> = () => {
  const [srcList, setSrcList] = useState<string[]>([]);
  const [hallId, setHallId] = useState<number>();
  const [seatAreaId, setSeatAreaId] = useState<number>();
  const [review, setReview] = useState<string>();

  const uploadReview = async () => {};

  return (
    <Wrap>
      <form action="">
        <Header>
          <Icon name="iconLeftArrow" />
          <span>시야 사진 업로드</span>
        </Header>
        <UploadImageList onChangeImageList={(value: string[]) => setSrcList(value)} />
        <UploadFormSeats
          onChangeHallId={(value: number) => setHallId(value)}
          onChangeSeatAreaId={(value: number) => setSeatAreaId(value)}
        />
        <UploadFormReview onChangeReview={(value: string) => setReview(value)} />
        <ButtonWrap>
          <button>업로드 하기</button>
        </ButtonWrap>
      </form>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-height: 630px;
  overflow: auto;
  background-color: ${({ theme }) => theme.color.white};
  margin: auto;
  padding: 15px 0;
  box-shadow: 4px 16px 40px rgba(168, 202, 207, 0.3);
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  span {
    font-size: 20px;
    font-weight: 700;
  }
`;

const ButtonWrap = styled.div`
  text-align: end;
  padding-right: 43px;
  margin-bottom: 20px;

  button {
    background-color: ${({ theme }) => theme.color.mint};
    color: ${({ theme }) => theme.fontColor.white};
    padding: 11px 20px;
    border-radius: 4px;
  }
`;
