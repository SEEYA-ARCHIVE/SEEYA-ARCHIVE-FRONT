import styled from 'styled-components';

const Title = styled.h1`
  color: red;
`;

const Home = () => {
  return (
    <Wrapper>
      <StyledHeader>시야 아카이브</StyledHeader>
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
