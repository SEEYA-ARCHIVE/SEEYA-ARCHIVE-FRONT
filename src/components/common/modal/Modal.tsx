import React, { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { modalListState } from 'src/stores/modal';
import styled from 'styled-components';

export const Modal: VFC = () => {
  const modalList = useRecoilValue(modalListState);
  return (
    <>
      {modalList.length > 0 && (
        <Wrapper>
          {modalList.map((Component, idx) => (
            <React.Fragment key={idx}>{Component}</React.Fragment>
          ))}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;
