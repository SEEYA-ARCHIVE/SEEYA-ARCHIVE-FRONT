import styled from 'styled-components';
import { useEffect } from 'react';
import { NextPage } from 'next';

import { Header } from 'src/components/common/header/Header';
import { MainInfo } from 'src/components/mainPage/mainInfo/MainInfo';
import { MainUpload } from 'src/components/mainPage/mainUpload/MainUpload';
import { MainHallSearch } from 'src/components/mainPage/mainHallSearch/MainHallSearch';
import { getHallListAPI, HallListType } from 'src/api/hall';

interface Props {
  hallData: HallListType;
}

const Home: NextPage<Props> = ({ hallData }) => {
  return (
    <Wrapper>
      <Header />
      <MainWrapper>
        <MainInfo />
      </MainWrapper>
    </Wrapper>
  );
};

Home.getInitialProps = async () => {
  const hallData = await getHallListAPI();
  return { hallData };
};

export default Home;

const Wrapper = styled.div``;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 240px 60px;

  margin: auto;

  .find_hall {
    font-size: 10px;
    text-decoration: underline;
    color: ${({ theme }) => theme.fontColor.black};
  }
`;
