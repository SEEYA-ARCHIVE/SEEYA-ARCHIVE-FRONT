import React, { FC } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { Header } from 'src/components/common/header/Header';
import { UploadForm } from 'src/components/upload/UploadForm';
import withAuth from 'src/hocs/withAuth';

interface Props {}

const UploadPage: FC<Props> = () => {
  return (
    <Wrap>
      <Head>
        <title>시야 아카이브 - 좌석 업로드</title>
      </Head>
      <Header bgColor="skyblue" />
      <ContentWrapper>
        <UploadForm />
      </ContentWrapper>
    </Wrap>
  );
};

export default withAuth(UploadPage);

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.skyblue};
`;
const ContentWrapper = styled.div`
  padding-top: 80px;
`;
