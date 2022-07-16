import React, { FC } from 'react';
import styled from 'styled-components';

import Icon from 'src/components/common/icon/Icon';

interface Props {
  isPlus?: boolean;
}

export const UploadImageBox: FC<Props> = ({ isPlus }) => {
  return (
    <Wrap>
      <label htmlFor="file-input">
        {isPlus ? <Icon name="iconPlus" fillColor="pastelBlue" size={15} /> : <Icon name="iconUploadImage" />}
      </label>
      <input type="file" id="file-input" />
    </Wrap>
  );
};

const Wrap = styled.div`
  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
  }

  input {
    display: none;
  }
`;
