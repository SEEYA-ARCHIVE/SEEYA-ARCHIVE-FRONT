import styled from 'styled-components';

<<<<<<< HEAD
import { Header } from 'src/components/common/header/Header';
import { MainInfo } from 'src/components/mainPage/mainInfo/MainInfo';
import { MainUpload } from 'src/components/mainPage/mainUpload/MainUpload';
import { MainHallSearch } from 'src/components/mainPage/mainHallSearch/MainHallSearch';

const Home = () => {
  return (
    <>
      <Header />
      <MainWrapper>
        <MainInfo />
        <div>
          <MainUpload />
          <MainHallSearch />
          <div className="find_hall">찾는 공연장이 없으신가요? 여기를 클릭하세요</div>
        </div>
      </MainWrapper>
    </>
=======
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
>>>>>>> bbfeebe (feat: common으로 폴더 변경)
  );
};

export default Home;

const MainWrapper = styled.div`
  max-width: 920px;
  display: flex;
  justify-content: space-between;
  padding: 165px 30px;

  margin: auto;

  .find_hall {
    font-size: 10px;
    text-decoration: underline;
    color: ${({ theme }) => theme.fontColor.black};
  }
`;
