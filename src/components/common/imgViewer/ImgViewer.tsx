import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  imgList: string[];
  userId: string;
}

export const ImgViewer: FC<Props> = ({ imgList, userId }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleImgClick = (idx: number) => setSelectedIdx(idx);

  return (
    <Wrapper>
      <PreviewImgWrapper>
        <Img src={imgList[selectedIdx]}></Img>
        <ImgInfoBar>
          <div className="user">{userId}</div>
          <div className="count">+{imgList.length - 1}</div>
        </ImgInfoBar>
      </PreviewImgWrapper>
      <MinImgWrapper>
        {imgList.map((src, idx) => {
          return (
            <Img
              key={src + idx}
              src={src}
              width={74}
              height={74}
              onClick={() => handleImgClick(idx)}
              isSelected={idx === selectedIdx}
            />
          );
        })}
      </MinImgWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;

const PreviewImgWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const Img = styled.img<{ isSelected?: boolean }>`
  border-radius: 10px;
  max-width: 480px;
  max-height: 420px;
  object-fit: cover;

  ${({ theme, isSelected }) =>
    isSelected &&
    css`
      border: 4px solid ${theme.color.mint};
    `}
`;

const ImgInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  color: ${({ theme }) => theme.fontColor.white};
  font-weight: 700;
  padding: 9px 12px;
  background-color: rgba(0, 0, 0, 0.25);
  .user {
    font-size: 12px;
  }
  .count {
    font-size: 16px;
  }
`;

const MinImgWrapper = styled.div`
  display: flex;
  margin-top: 8px;

  & > *:not(:first-child) {
    margin-left: 5px;
  }
`;
