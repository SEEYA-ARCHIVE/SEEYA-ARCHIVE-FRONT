import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from '../common/icon/Icon';

interface Props {}

export const UploadForm: FC<Props> = () => {
  return (
    <Wrap>
      <Header>
        <Icon name="iconLeftArrow" />
        <span>시야 사진 업로드</span>
      </Header>
      <Content>
        <label htmlFor="imgInput">Select Image</label>
        <input id="imgInput" type="file" />
      </Content>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 600px;
  background-color: ${({ theme }) => theme.color.white};
  margin: auto;
  padding: 15px 0;
  box-shadow: 4px 16px 40px rgba(168, 202, 207, 0.3);
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  span {
    font-size: 20px;
    font-weight: 700;
  }
`;

const Content = styled.div`
  padding: 0 43px;
  input {
    display: none;
  }
  label {
    width: 512px;
    height: 300px;
    background: #f5f5f5;
    border: 4px dashed #e5e5e5;
    border-radius: 20px;
  }
`;
