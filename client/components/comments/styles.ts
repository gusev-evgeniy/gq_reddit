import styled from 'styled-components';
import { FooterButton } from '../../styles';

export const StyledCommentSection = styled.div`
  border: 1px solid #edeff1;
  border-radius: 4px;
  width: 80%;
  position: relative;
`;

export const StyledCommentForm = styled(StyledCommentSection)`
  border-radius: 4px;
  padding: 10px 10px 40px 10px;

  .button_wrapper {
    position: absolute;
    right: 10px;
    bottom: 10px;
    height: 30px;
    width: 80px;
  }
`;

export const StyledPostCommentForm = styled(StyledCommentForm)`
  min-height: 120px;
  width: 80%;
  margin: 40px auto 0 auto;
`;

export const StyledAnswerCommentForm = styled(StyledCommentForm)`
  min-height: 80px;
  width: 70%;
  margin: 5px 10px 10px 10px;
`;

export const StyledCommentOffer = styled(StyledCommentSection)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #7c7c7c;
  margin: 40px auto 0 auto;
`;

export const CommentsSeparator = styled.div`
  width: 80%;
  height: 1px;
  background-color: #edeff1;
  margin: 40px auto 40px auto;
`;

export const StyledCommentItem = styled.div<{marginLeft: number}>`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
  padding-right: 20px;

  .ava_wrapper {
    width: 30px;
    height: 30px;
    margin: 10px;
  }

  .data_section {
    width: 100%;

    .header {
      width: inherit;
      display: flex;
      font-size: 12px;

      .dot {
        margin: 0 4px;
      }

      .name {
        font-size: 13px;
        font-weight: 500;
      }

      .created_at {
        font-weight: 400px;
        color: #747576;
      }
    }

    .body {
      margin: 5px;
      white-space: pre-line;
      line-height: 1.45;
    }

    .footer {
      display: flex;
      font-size: 12px;
      height: 32px;
      align-items: center;

      .rating {
        display: flex;
        align-items: center;
        color: #878a8c;
        font-weight: 700;

        p {
          margin-right: 4px;
        }
      }
    }
  }
`;

export const CommentFooterButton = styled(FooterButton)`
  padding: 4px;
`;
