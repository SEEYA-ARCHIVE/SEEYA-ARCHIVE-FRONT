import React, { Dispatch, SetStateAction, useEffect, VFC } from 'react';
import styled from 'styled-components';

interface IOption {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (selectFloor: string) => void | Dispatch<SetStateAction<string>>;
  options: IOption[];
}

export const Select: VFC<Props> = ({ value, onChange, options }) => {
  const onChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    if (value) return;

    onChange(options[0].value);
  }, []);

  return (
    <SelectComponent value={value} onChange={onChangeOption}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label.toUpperCase()}
        </Option>
      ))}
    </SelectComponent>
  );
};

const SelectComponent = styled.select`
  height: 36px;
  color: #424242;
  border: 1px solid #dfe6ed;
  border-radius: 3px;
  padding-left: 12px;
  padding-right: 30px;
  font-size: 13px;
  font-weight: 400;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-image: url('assets/icon/Caret.svg');

  background-size: 6px;
  background-position: calc(100% - 12px) center;
  background-repeat: no-repeat;
  background-color: #f4faff;
`;

const Option = styled.option`
  /* TODO : Styling */
`;
