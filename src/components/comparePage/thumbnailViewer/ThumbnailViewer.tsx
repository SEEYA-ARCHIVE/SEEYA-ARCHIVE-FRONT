import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import Icon from 'src/components/common/icon/Icon';
import { Img } from 'src/components/common/image/Img';
import { compareSeatState } from 'src/stores/compare';
import styled from 'styled-components';

export type CompareReviewType = {
  seatArea: string;
  userId: string;
  reviewId: number;
  imageSrc: string;
  commentCount: number;
  likeCount: number;
  reviewDesc: string;
};

export interface CompareSeatAreaType {
  id: number;
  userNickname: string;
  thumbnailImage: string;
  seatAreaName: string;
  review: string;
  createAt: string;
  countLikeUsers: number;
  countComments: number;
}

const ThumbnailHeader = ({ seatArea, reviewId }: Pick<CompareReviewType, 'seatArea' | 'reviewId'>) => {
  const [, setCompareArea] = useRecoilState(compareSeatState);

  const resetSelectedCompareArea = () => {};

  const goReivewDetail = () => {};

  return (
    <HeaderWrap>
      <Icon name="iconX_24" onClick={resetSelectedCompareArea} />
      <div>{seatArea}</div>
      <Icon name="iconThreeDots" onClick={goReivewDetail} />
    </HeaderWrap>
  );
};

const ThumnbnailFooter = ({
  userId,
  reviewDesc,
  likeCount,
  commentCount,
}: Pick<CompareReviewType, 'userId' | 'reviewDesc' | 'likeCount' | 'commentCount'>) => {
  return (
    <FooterWrap>
      <FooterTitle>
        <div>{userId}</div>
        <FooterIconWrap>
          <div>
            <Icon name="iconSmallThumbsUp" />
            <span>{likeCount}</span>
          </div>
          <div>
            <Icon name="iconSmallComment" />
            <span>{commentCount}</span>
          </div>
        </FooterIconWrap>
      </FooterTitle>
      <FooterDesc>{reviewDesc}</FooterDesc>
    </FooterWrap>
  );
};

export const ThumbnailViewer: FC<CompareSeatAreaType> = ({
  id,
  userNickname,
  thumbnailImage,
  seatAreaName,
  review,
  createAt,
  countLikeUsers,
  countComments,
}) => {
  return (
    <Wrap>
      <Img src={thumbnailImage} width={389} height={389} />
      <ThumbnailHeader seatArea={seatAreaName} reviewId={id} />
      <ThumnbnailFooter
        {...{ userId: userNickname, commentCount: countComments, likeCount: countLikeUsers, reviewDesc: review }}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 389px;
  height: 389px;
  position: relative;
  color: white;
  border-radius: 12px;
  overflow: hidden;
`;

const HeaderWrap = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;

  width: 100%;

  padding: 16px;

  font-size: 24px;
  font-weight: 700;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
`;

const FooterWrap = styled.div`
  position: absolute;
  bottom: 0;
  padding: 14px 16px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
`;

const FooterTitle = styled.div`
  font-weight: 700;
  font-size: 11px;
  line-height: 11px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const FooterIconWrap = styled.div`
  display: flex;

  & > div {
    display: flex;
    align-items: center;
    margin-left: 8px;
    svg {
      margin-right: 3px;
    }
  }
`;

const FooterDesc = styled.div`
  font-size: 10px;
  line-height: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
