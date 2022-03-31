import React from 'react';
import { TestModal } from './TestModal';

// union type
type modalsKey = 'testModal';

export interface IModal {
  key: modalsKey;
  props?: any;
}

type ModalMap = {
  [key in modalsKey]: React.ElementType;
};

export const modalMap: ModalMap = {
  testModal: TestModal,
};
