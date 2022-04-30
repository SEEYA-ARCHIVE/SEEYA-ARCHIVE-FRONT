import React, { VFC } from 'react';
import { Tag } from 'src/components/common/tag/Tag';
import styled from 'styled-components';

interface Props {
  tagList: string[];
}

const ReviewTagList: VFC<Props> = ({ tagList }) => {
  return (
    <Wrapper>
      {tagList.map((tag, idx) => (
        <Tag key={idx} text={tag} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
`;

export default ReviewTagList;
