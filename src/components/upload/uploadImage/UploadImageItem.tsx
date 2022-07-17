import React, { ChangeEvent, FC } from 'react';
import { uploadImage } from 'src/api/upload';
import Icon from 'src/components/common/icon/Icon';
import { Img } from 'src/components/common/image/Img';
import styled, { css } from 'styled-components';

interface Props {
  src?: string;
  isInput: boolean;
  index: number;
  handleUploadImages: (uploadImgSrc: string[]) => void;
}

export const UploadedImageItem: FC<Props> = ({ src, isInput, index, handleUploadImages }) => {
  const isEmpty = !src;

  const uploadImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('image', files[i]);
    }

    const uploadImgSrc = await uploadImage(formdata);
    handleUploadImages(uploadImgSrc);
  };

  if (isInput) {
    return (
      <InputWrap>
        <label htmlFor="file-input">
          {index !== 0 ? <Icon name="iconPlus" fillColor="pastelBlue" size={15} /> : <Icon name="iconUploadImage" />}
        </label>
        <input type="file" id="file-input" multiple accept="image/jpg, image/png, image/jpeg" onChange={uploadImages} />
      </InputWrap>
    );
  }

  return <Wrap isEmpty={isEmpty}>{src && <Img src={src} width={80} height={80} />}</Wrap>;
};

const InputWrap = styled.div`
  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
  }

  input {
    display: none;
  }
`;

const Wrap = styled.div<{ isEmpty: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;

  ${({ isEmpty }) =>
    isEmpty &&
    css`
      background-color: #688f95;
      opacity: 0.15;
    `}
`;
