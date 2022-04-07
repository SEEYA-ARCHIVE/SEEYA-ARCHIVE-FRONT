import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Select } from 'src/components/common/select/Select';
import { ReviewCard } from 'src/components/reviewListPage/ReviewCard';
import Icon from '../icon/Icon';
import { sampleThumbnail } from '../image/imagePath';

interface Props {
  // TODO 구역 정보 받기
}

// TODO 임시 데이터
const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'price', label: '가격순' },
];
const MOCK_REVIEW_DATA = [
  {
    imgSrc: sampleThumbnail.src,
    author: '박은서',
    surplusPic: 2,
    createdAt: '2022/3/27',
    tagList: ['세븐틴', '올림픽홀', '월드투어'],
    helpCount: 25,
  },
];

export const ReviewListModal: FC = () => {
  const [sort, setSort] = useState('');
  const reviewCount = MOCK_REVIEW_DATA.length; // TODO 데이터 받는 방식에 따라 수정 pagination or all
  return (
    <Wrapper>
      <ReviewWrapper>
        <TitleWrapper>
          <Title>
            <strong>{reviewCount}건</strong>의 리뷰가 있습니다.
          </Title>
          <Select options={SORT_OPTIONS} value={sort} onChange={setSort} />
        </TitleWrapper>
        <ScrollWrapper>
          <ReviewListWrapper>
            {MOCK_REVIEW_DATA.map((data, idx) => {
              const { imgSrc, author, surplusPic, createdAt, tagList, helpCount } = data;
              return (
                <ReviewCard
                  key={imgSrc + idx}
                  imgSrc={imgSrc}
                  author={author}
                  surplusPic={surplusPic}
                  createdAt={createdAt}
                  tagList={tagList}
                  helpCount={helpCount}
                />
              );
            })}
          </ReviewListWrapper>
        </ScrollWrapper>
      </ReviewWrapper>
      <StyledChevron name="iconCircleChevronRight" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80vw;
  height: 100%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
  background-color: ${({ theme }) => theme.color.white};
  animation: ${({ theme }) => theme.animation.slideIn} 1s ease-in-out;
  border-left: 4px solid ${({ theme }) => theme.color.mint};
  padding: 36px 0 0 54px;
`;

const ReviewWrapper = styled.div`
  width: 675px;
  height: 100%;
`;

const TitleWrapper = styled.div`
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 28px;
  color: ${({ theme }) => theme.color.darkGray};

  strong {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.blue};
  }
`;

const ScrollWrapper = styled.div`
  width: 695px;
  height: calc(100% - 36px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: block;
    width: 8px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 6px;
  }
`;

const ReviewListWrapper = styled.div`
  width: 675px;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 15px;
  grid-column-gap: 12px;
  grid-auto-rows: minmax(305px, auto);
  padding-bottom: 10px;
  padding-right: 20px;
`;

const StyledChevron = styled(Icon)`
  position: absolute;
  top: 45%;
  left: 0;
`;
