import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { UploadImageBox } from './UploadImageBox';
import { UploadedImageItem } from './UploadImageItem';

interface Props {}

const MAX_UPLOAD = 5;
export const UploadImageList: FC<Props> = () => {
  const [imgSrc, setImgSrc] = useState<string[]>([]);

  return (
    <Wrap>
      {!imgSrc.length && <UploadImageBox />}
      {new Array(MAX_UPLOAD - imgSrc.length - 1).fill('').map((_, idx) => (
        <UploadedImageItem key={idx} src={imgSrc[idx]} />
      ))}
      {!!imgSrc.length && imgSrc.length < MAX_UPLOAD && <UploadImageBox />}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  padding: 0 84px;
  padding-top: 30px;

  & > * + * {
    margin-left: 10px;
  }
`;
