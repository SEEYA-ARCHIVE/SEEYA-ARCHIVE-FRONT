import React, { useState, VFC } from 'react';
import styled, { css } from 'styled-components';
import Icon from 'src/components/common/icon/Icon';
import { writeReviewCommentAPI } from 'src/api/review';
import { userSessionState } from 'src/stores/user';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { getReviewCommentList } from 'src/stores/review';
import useModal from 'src/hooks/useModal';
import AlertModal from 'src/components/common/modal/AlertModal';
import { useRouter } from 'next/router';

interface Props {
  reviewId: number;
}

const CommentFactory: VFC<Props> = ({ reviewId }) => {
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const userSession = useRecoilValue(userSessionState);
  const router = useRouter();
  const { openModal } = useModal();
  const refreshCommentList = useRecoilRefresher_UNSTABLE(getReviewCommentList(reviewId));

  const onClickLikeButton = () => {
    setIsLiked((prev) => !prev!);
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComment(value);
  };

  const onClickReportButton = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSd6TDa06LY6PvrY4kB2jpdXYQI0pnfw9F--JYZd1nadcyWX_g/viewform?usp=sf_link',
    );
  };

  const submitComment = async () => {
    if (userSession) {
      try {
        await writeReviewCommentAPI(reviewId, comment);
        setComment('');
        refreshCommentList();
      } catch (err) {
        openModal(<AlertModal iconName="iconAlertUpload" mainMsg="에러가 발생했습니다. 다시 시도해주세요" />);
      }
      return;
    }

    openModal(<AlertModal color="blue5" mainMsg="로그인 후 이용 가능합니다." onClick={() => router.push('/auth')} />);
  };

  const onKeyPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submitComment();
  };

  return (
    <Wrapper>
      <InteractionWrapper>
        <LikeWrapper>
          <LikeButton isLiked={isLiked} onClick={onClickLikeButton}>
            <Icon name="iconThumbsUp" size={15} />
          </LikeButton>
          도움이 돼요!
        </LikeWrapper>
        <RepotButton onClick={onClickReportButton}>
          <Icon name="iconReport" size={12} />
          신고하기
        </RepotButton>
      </InteractionWrapper>

      <CommentInput
        type="text"
        placeholder="댓글을 입력해주세요."
        value={comment}
        onChange={onChangeComment}
        onKeyPress={onKeyPressEnter}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InteractionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor.black};
`;

const LikeButton = styled.button<{ isLiked: boolean }>`
  background-color: ${({ theme }) => theme.color.white};

  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.color.gray2};

  padding: 3px 10px;

  cursor: pointer;

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.gray2};
  }

  ${({ isLiked }) =>
    isLiked &&
    css`
      background-color: ${({ theme }) => theme.color.mint};
      border: 1px solid ${({ theme }) => theme.color.mint};
      svg > path {
        stroke: ${({ theme }) => theme.color.white};
      }

      &:focus {
        border: 1px solid ${({ theme }) => theme.color.mint};
      }
    `}
`;

const RepotButton = styled.button`
  display: flex;
  gap: 2px;
  align-items: center;

  padding: 5.5px 8px;

  background-color: ${({ theme }) => theme.color.gray5};
  color: #c4c4c4;
  font-size: 9px;
  font-weight: 500;

  border-radius: 25px;
`;

const CommentForm = styled.form`
  width: 100%;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 8px 0 8px 16px;

  background-color: ${({ theme }) => theme.color.gray5};
  color: ${({ theme }) => theme.fontColor.black};

  border: none;
  border-radius: 16px;

  font-size: 12px;
  font-weight: 500;

  ::placeholder {
    color: #c4c4c4;
  }
`;

export default CommentFactory;
