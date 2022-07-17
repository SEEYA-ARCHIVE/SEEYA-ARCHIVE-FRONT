import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { UploadedImageItem } from './UploadImageItem';

interface Props {
  onChangeImageList: (value: string[]) => void;
}

const MAX_UPLOAD = 5;
export const UploadImageList: FC<Props> = ({ onChangeImageList }) => {
  const [imgSrc, setImgSrc] = useState<string[]>([]);

  const handleUploadImages = (uploadImgSrc: string[]) => {
    const availableUploadCount = MAX_UPLOAD - imgSrc.length;

    const avaliableUploadSrc = uploadImgSrc.slice(0, availableUploadCount);
    setImgSrc([...imgSrc, ...avaliableUploadSrc]);
    onChangeImageList([...imgSrc, ...avaliableUploadSrc]);
  };

  return (
    <>
      <Wrap>
        <div>
          {new Array(MAX_UPLOAD).fill('').map((_, idx) => (
            <UploadedImageItem
              key={idx}
              src={imgSrc[idx]}
              isInput={!imgSrc[idx] && ((idx === 0 && !imgSrc.length) || !!imgSrc[idx - 1])}
              index={idx}
              handleUploadImages={handleUploadImages}
            />
          ))}
        </div>
        <Desc>시야 사진 최대 5개 첨부 가능, 다른 관객의 초상권을 침해하지 않도록 주의해주세요.</Desc>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 84px;
  padding-top: 75px;

  & > div {
    display: flex;
  }

  & > div > * + * {
    margin-left: 10px;
  }
`;

const Desc = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.fontColor.gray};
  margin-top: 12px;
`;
