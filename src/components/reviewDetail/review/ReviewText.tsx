import React, { VFC } from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
}

const ReviewText: VFC<Props> = ({ text }) => {
  const lineFormatter = (text: string) => {
    return text.replaceAll('\\n', '\n');
  };

  const hashtagFormatter = (text: string) => {
    const splitter = text.split(/(#[^\s#]+)/g);
    return splitter.filter(Boolean).map((v, idx) => {
      if (v.includes('#')) {
        return (
          <span className="hashtag" key={idx}>
            {v}
          </span>
        );
      } else {
        return <span key={idx}>{v}</span>;
      }
    });
  };

  const formattedText = (text: string) => {
    return hashtagFormatter(lineFormatter(text));
  };

  return <TextWrapper>{formattedText(text)}</TextWrapper>;
};

const TextWrapper = styled.div`
  font-size: 12px;
  line-height: 20px;
  white-space: pre-line;
  word-wrap: break-word;
  color: ${({ theme }) => theme.fontColor.black};

  .hashtag {
    color: ${({ theme }) => theme.color.blue5};
    font-weight: 700;
    cursor: pointer;
  }
`;
export default ReviewText;
