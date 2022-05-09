import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Button } from 'src/components/common/button/Button';
import { isCompareModeState, selectedCompareSeatState } from 'src/stores/compare';
import styled, { css } from 'styled-components';

interface Props {}

export const FABCompareBox: FC<Props> = () => {
  const [isCompareMode, setIsCompareMode] = useRecoilState(isCompareModeState);
  const selectedCompareSeat = useRecoilValue(selectedCompareSeatState);

  const handleCompareBtnClick = () => {
    setIsCompareMode(true);
  };
  const handleCancleBtnClick = () => {};

  return isCompareMode ? (
    <ComparingBox>
      <div className="inner_box_wrapper">
        <CompareInnerBox>비교할 구역을 클릭하세요.</CompareInnerBox>
        <CompareInnerBox>비교할 구역을 클릭하세요.</CompareInnerBox>
      </div>
      <Button bgColor="darkGray" className="compare_btn">
        비교하기
      </Button>
    </ComparingBox>
  ) : (
    <ReadyBox>
      <div>어떤 좌석이 더 좋을지 고민된다면?</div>
      <Button bgColor="darkGray" className="compare_start_btn" onClick={() => setIsCompareMode(true)}>
        비교 시작하기
      </Button>
    </ReadyBox>
  );
};

const CompareBox = styled.div`
  width: 160px;

  position: absolute;
  right: 50px;
  top: 50%;
  transform: translate(0, -60%);

  border-radius: 40px;
  background-color: ${({ theme }) => theme.color.gray5};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  font-size: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 25px;
`;

const ReadyBox = styled(CompareBox)`
  color: ${({ theme }) => theme.fontColor.gray};

  font-weight: 700;
  line-height: 20px;
  text-align: center;
  & > div {
    margin-bottom: 8px;
  }
  .compare_start_btn {
    width: 115px;
  }
`;

const ComparingBox = styled(CompareBox)`
  height: 350px;

  .inner_box_wrapper {
    margin-bottom: 24px;
  }

  .compare_btn {
    min-width: 85px;
    margin-bottom: 8px;
  }
`;

const CompareInnerBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.color.white};
  margin-bottom: 8px;
  border: 2px dashed #c4c4c4;
  border-radius: 10px;
  padding: 35px 12px;
  word-break: keep-all;
  line-height: 20px;
  color: ${({ theme }) => theme.fontColor.gray};
  font-weight: 700;
`;
