import { useRouter } from 'next/router';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { uploadReviewAPI } from 'src/api/upload';
import useModal from 'src/hooks/useModal';
import styled from 'styled-components';
import Icon from '../common/icon/Icon';
import AlertModal from '../common/modal/AlertModal';
import { UploadFormReview } from './UploadFormReview';
import { UploadFormSeats } from './UploadFormSeats';
import { UploadImageList } from './uploadImage/UploadImageList';

interface Props {}

export const UploadForm: FC<Props> = () => {
  const router = useRouter();

  const [srcList, setSrcList] = useState<string[]>([]);
  const [seatAreaId, setSeatAreaId] = useState<number>();
  const [review, setReview] = useState<string>('');
  const { openModal } = useModal();

  const uploadReview = async (e: MouseEvent) => {
    e.preventDefault();
    if (!srcList.length || !seatAreaId || !review) {
      openModal(<AlertModal iconName="iconAlertUpload" mainMsg="정보를 모두 입력해주세요" />);
    }
    const uploadReviewData = {
      imageUrlArray: srcList,
      seatAreaId: seatAreaId,
      review,
    };

    const { data: uploadedReview } = await uploadReviewAPI(uploadReviewData);

    if (!uploadedReview) {
      openModal(
        <AlertModal
          color="red"
          iconName="iconAlertUpload"
          mainMsg="업로드에 실패했습니다."
          subMsg={['잠시 후 다시 시도해주세요.']}
        />,
      );
      return;
    }
    openModal(
      <AlertModal
        color="blue5"
        iconName="iconAlertUpload"
        mainMsg="업로드가 완료되었습니다."
        subMsg={['사진과 리뷰를 제공해주셔서 감사합니다.']}
        onClick={() => {
          router.push(`/review/${uploadedReview.seatArea}/${uploadedReview.id}`);
        }}
      />,
    );
  };

  return (
    <Wrap>
      <form action="">
        <Header>
          {/* <Icon name="iconLeftArrow" /> */}
          <span>시야 사진 업로드</span>
        </Header>
        <UploadImageList onChangeImageList={(value: string[]) => setSrcList(value)} />
        <UploadFormSeats onChangeSeatAreaId={(value: number) => setSeatAreaId(value)} />
        <UploadFormReview onChangeReview={(value: string) => setReview(value)} />
        <ButtonWrap>
          <button onClick={uploadReview}>업로드 하기</button>
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
