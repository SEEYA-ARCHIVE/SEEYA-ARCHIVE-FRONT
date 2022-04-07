import React, { FC } from 'react';
import styled from 'styled-components';
import { Card } from '../common/card/Card';
import Icon from '../common/icon/Icon';
import { Tag } from '../common/tag/Tag';

interface Props {
  imgSrc: string;
  author: string;
  surplusPic: number;
  createdAt: string;
  tagList: string[];
  helpCount: number;
}

export const ReviewCard: FC<Props> = ({ imgSrc, author, surplusPic, createdAt, tagList, helpCount }) => {
  return (
    <Card>
      <ImageWrapper>
        <Img src={imgSrc} />
        <PicInfo>
          <NameText>{author}</NameText>
          <SurplusText>{surplusPic ? `+${surplusPic}` : ''}</SurplusText>
        </PicInfo>
      </ImageWrapper>
      <InfoWrapper>
        <DateText>{createdAt}</DateText>
        <TagList>
          {tagList.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </TagList>
        <HelpTextWrapper>
          <HelpText>{helpCount}명에게 도움이 되었습니다.</HelpText>
          <Icon name="iconThumbsUp" />
        </HelpTextWrapper>
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
`;

const Img = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  height: 88px;
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
