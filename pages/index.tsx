import styled from 'styled-components';

import Icon from 'src/components/common/icon/Icon';
import { Img } from 'src/components/common/image/Img';
import Comment from 'public/assets/icon/Comments.svg';

const Title = styled.h1`
  color: red;
`;

const Home = () => {
  return (
    <Wrapper>
      <StyledHeader>시야 아카이브</StyledHeader>
      <Img name="sample" width={300} height={300} />
      <Icon name="iconComment" fillColor="blue" />
      <Comment />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  padding: 30px;
`;

const StyledHeader = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 4rem;
  font-weight: 700;

  margin-bottom: 30px;
`;
