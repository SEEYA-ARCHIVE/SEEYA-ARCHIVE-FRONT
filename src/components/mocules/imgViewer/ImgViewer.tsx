import React, { FC, useState } from 'react';

import * as S from './imgViewer.style';

interface Props {
  imgList: string[];
  width?: number;
  height?: number;
}

const MAX_IMG_COUNT = 5;
const GAP = 10;

export const ImgViewer: FC<Props> = ({ imgList, width = 500, height = 400 }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const minWidth = Math.floor((width - GAP * (MAX_IMG_COUNT - 1)) / 5);

  const handleImgClick = (idx: number) => setSelectedIdx(idx);

  return (
    <S.Wrapper>
      <S.Img src={imgList[selectedIdx]} width={width} height={height}></S.Img>
      <S.MinImgWrapper gap={GAP}>
        {imgList.map((src, idx) => {
          return (
            <S.Img
              key={src + idx}
              src={src}
              width={minWidth}
              height={minWidth}
              onClick={() => handleImgClick(idx)}
              isSelected={idx === selectedIdx}
            />
          );
        })}
      </S.MinImgWrapper>
    </S.Wrapper>
  );
};
