import styled from 'styled-components';
import { FooterButton } from '../../styles';

export const StyledCommentSection = styled.div`
  margin: 40px auto 0 auto;
  border: 1px solid #edeff1;
  border-radius: 4px;
  width: 80%;
  position: relative;
`;

export const StyledCommentForm = styled(StyledCommentSection)`
  min-height: 120px;
  border-radius: 4px;
  width: 80%;
  padding: 10px 10px 40px 10px;

  .button_wrapper {
    position: absolute;
    right: 10px;
    bottom: 10px;
    height: 30px;
    width: 80px;
  }
`;

export const StyledCommentOffer = styled(StyledCommentSection)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #7c7c7c;
`;

export const CommentsSeparator = styled.div`
  width: 80%;
  height: 1px;
  background-color: #edeff1;
  margin: 40px auto 40px auto;
`;

export const StyledCommentItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  padding-right: 20px;

  .ava_wrapper {
    width: 40px;
    height: 40px;
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

    .body_section {
      margin: 4px 0;
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
