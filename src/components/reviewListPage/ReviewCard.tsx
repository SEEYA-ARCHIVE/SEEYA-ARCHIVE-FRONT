import Image from 'next/image';
import React, { FC } from 'react';
import useModal from 'src/hooks/useModal';
import { convertDateToFormattedString } from 'src/utils/timeUtil';
import styled from 'styled-components';
import { Card } from '../common/card/Card';
import Icon from '../common/icon/Icon';
import { Tag } from '../common/tag/Tag';

interface Props {
  id: number;
  imgSrc: string;
  author?: string;
  surplusPic: number;
  createdAt: string;
  tagList?: string[];
  helpCount?: number;
}

export const ReviewCard: FC<Props> = ({ id, imgSrc, author, surplusPic, createdAt, tagList, helpCount }) => {
  const formattedDate = convertDateToFormattedString(createdAt);
  const { openModal } = useModal();
  const onClickCard = () => {
    openModal(<></>);
  };

  return (
    <Card>
      <ImageWrapper>
        <Img src={imgSrc} layout="fill" objectFit="cover" />
        <PicInfo>
          <NameText>{author ?? '시야봇'}</NameText>
          <SurplusText>{surplusPic ? `+${surplusPic}` : ''}</SurplusText>
        </PicInfo>
      </ImageWrapper>
      <InfoWrapper>
        <DateText>{formattedDate}</DateText>
        <TagList>
          {/* TODO: Prototype 이후 */}
          {/* {tagList?.map((tag) => (
            <Tag key={tag} text={tag} />
          ))} */}
          <Tag text="올림픽홀" />
        </TagList>
        {/* TODO: Prototype 이후 */}
        {/* <HelpTextWrapper>
          <HelpText>{helpCount}명에게 도움이 되었습니다.</HelpText>
          <PointerIcon name="iconThumbsUp" />
        </HelpTextWrapper> */}
      </InfoWrapper>
    </Card>
  );
};

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 217px;

  overflow: hidden;
  cursor: pointer;
`;

const Img = styled(Image)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: 0.5s all;

  &:hover {
    transform: scale(1.1);
  }
`;

const PicInfo = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 30.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px 0 9px;
`;

const NameText = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white};
`;

const SurplusText = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white};
`;

const InfoWrapper = styled.div`
  padding: 12px;
`;

const DateText = styled.p`
  color: #7b7b7b;
  font-size: 12px;
  font-weight: 400;
`;

const TagList = styled.div`
  margin: 8px 0;
  display: flex;
  gap: 4px;
`;

const HelpTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HelpText = styled.p`
  color: #333333;
  font-size: 12px;
  font-weight: 500;
`;

const PointerIcon = styled(Icon)`
  cursor: pointer;
`;
