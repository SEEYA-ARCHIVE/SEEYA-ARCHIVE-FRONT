import styled from 'styled-components';
import { useEffect } from 'react';
import { NextPage } from 'next';

import { Header } from 'src/components/common/header/Header';
import { MainInfo } from 'src/components/mainPage/mainInfo/MainInfo';
import { MainUpload } from 'src/components/mainPage/mainUpload/MainUpload';
import { MainHallIconList } from 'src/components/mainPage/mainHallSearch/MainHallIconList';
import { getHallListAPI, HallListType } from 'src/api/hall';
import { MainLottie } from 'src/components/mainPage/mainLottie/MainLottie';

interface Props {
  hallData: HallListType;
}

const Home: NextPage<Props> = ({ hallData }) => {
  return (
    <Wrapper>
      <Header />
      <MainWrapper>
        <MainInfo />
        <MainHallIconList hallData={hallData} />
        <MainLottie />
      </MainWrapper>
      <MainLottie />
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
  padding: 240px 60px;

  margin: auto;

  .find_hall {
    font-size: 10px;
    text-decoration: underline;
    color: ${({ theme }) => theme.fontColor.black};
  }
`;
