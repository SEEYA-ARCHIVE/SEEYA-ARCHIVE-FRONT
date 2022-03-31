import React, { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { modalListState } from 'src/stores/modal';
import { modalMap } from './ModalManager';
import * as S from './modal.style';
import useModal from 'src/hooks/useModal';

export const Modal: VFC = () => {
  const modalList = useRecoilValue(modalListState);

  return (
    <>
      {modalList.length > 0 && (
        <S.Wrapper>
          <S.Background />
          {modalList.map(({ key, props }) => {
            const CustomModal = modalMap[key];
            return (
              <S.Content key={key}>
                <CustomModal {...props} />
              </S.Content>
            );
          })}
        </S.Wrapper>
      )}
    </>
  );
};
