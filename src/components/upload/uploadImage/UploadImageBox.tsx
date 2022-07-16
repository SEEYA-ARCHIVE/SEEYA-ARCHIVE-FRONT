import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

import Icon from 'src/components/common/icon/Icon';
import { uploadImage } from 'src/api/upload';

interface Props {
  isPlus?: boolean;
}

export const UploadImageBox: FC<Props> = ({ isPlus = false }) => {
  const uploadImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('image', files[i]);
    }

    const res = await uploadImage(formdata);
  };
  return (
    <Wrap>
      <label htmlFor="file-input">
        {isPlus ? <Icon name="iconPlus" fillColor="pastelBlue" size={15} /> : <Icon name="iconUploadImage" />}
      </label>
      <input type="file" id="file-input" multiple accept="image/jpg, image/png, image/jpeg" onChange={uploadImages} />
    </Wrap>
  );
};

const Wrap = styled.div`
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
