import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { UploadImageBox } from './UploadImageBox';
import { UploadedImageItem } from './UploadImageItem';

interface Props {}

const MAX_UPLOAD = 5;
export const UploadImageList: FC<Props> = () => {
  const [imgSrc, setImgSrc] = useState<string[]>([]);

  return (
    <>
      <Wrap>
        <div>
          {!imgSrc.length && <UploadImageBox />}
          {new Array(MAX_UPLOAD - imgSrc.length - 1).fill('').map((_, idx) => (
            <UploadedImageItem key={idx} src={imgSrc[idx]} />
          ))}
          {!!imgSrc.length && imgSrc.length < MAX_UPLOAD && <UploadImageBox />}
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
