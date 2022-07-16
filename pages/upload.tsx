import Head from 'next/head';
import React, { FC } from 'react';
import { Header } from 'src/components/common/header/Header';
import { UploadForm } from 'src/components/upload/UploadForm';
import styled from 'styled-components';

interface Props {}

const UploadPage: FC<Props> = () => {
  return (
    <Wrap>
      <Head>
        <title>시야 아카이브 - 좌석 업로드</title>
      </Head>
      <ContentWrapper>
        <UploadForm />
      </ContentWrapper>
      <Header />
    </Wrap>
  );
};

export default UploadPage;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f4faff;
`;
const ContentWrapper = styled.div`
  padding-top: 80px;
`;
