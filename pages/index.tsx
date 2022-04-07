import styled from 'styled-components';

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
  );
};

export default Home;

const MainWrapper = styled.div`
  max-width: 1000px;
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
