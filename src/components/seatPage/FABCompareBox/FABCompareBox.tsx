import React, { FC } from 'react';
import { Button } from 'src/components/common/button/Button';
import styled, { css } from 'styled-components';

interface Props {}

export const FABCompareBox: FC<Props> = () => {
  return (
    <FABCompareBoxWrapper>
      <div className="inner_box_wrapper">
        <CompareInnerBox>비교할 구역을 클릭하세요.</CompareInnerBox>
        <CompareInnerBox>비교할 구역을 클릭하세요.</CompareInnerBox>
      </div>
      <Button bgColor="darkGray" className="compare_btn">
        비교하기
      </Button>
    </FABCompareBoxWrapper>
  );
};

const FABCompareBoxWrapper = styled.div`
  position: fixed;
  right: 50px;
  top: 50%;
  transform: translate(0, -60%);

  width: 160px;
  height: 350px;

  border-radius: 40px;
  background-color: ${({ theme }) => theme.color.gray5};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  font-size: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 25px;

  .inner_box_wrapper {
    margin-bottom: 24px;
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
