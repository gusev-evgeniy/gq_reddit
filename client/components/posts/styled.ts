import styled from 'styled-components';
import { FooterButton } from '../../styles';

export const StyledPostSource = styled.div`
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;

  .body_wrapper {
    padding: 12px 12px 2px 12px;
    width: 100%;
  }
`;

export const StyledPostItem = styled(StyledPostSource)`
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #ccc;

  .rating {
    background-color: rgb(248, 249, 250);
  }
`;

export const LargePostWrapper = styled(StyledPostSource)`
  flex-direction: column;
  margin-bottom: 20px;

  .post_wrapper {
    display: flex;
  }

  .loading {
    width: 100%;
    height: 60vh;
  }
`;

export const VoteButton = styled.button`
  background-color: inherit;
  width: 100%;
  height: auto;
  transform: rotate(-90deg);
`;

export const VoteUp = styled(VoteButton)`
  transform: rotate(-90deg);
`;

export const VoteDown = styled(VoteButton)`
  transform: rotate(90deg);
`;

export const TextContent = styled.div<{ isLarge?: boolean }>`
  width: 100%;
  max-height: ${({ isLarge }) => (isLarge ? 'fit-content' : '250px')};
  overflow: hidden;

  -webkit-mask-image: ${({ isLarge }) =>
    isLarge ? 'none' : 'linear-gradient(180deg, #000 60%, transparent)'};

  p {
    padding: 0.5em 0 0.25em;
  }
`;

export const StyledPostHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
  margin-bottom: 5px;

  .info {
    display: flex;
    align-items: center;

    .ava_wrapper {
      width: 24px;
      height: 24px;
      margin-right: 3px;
    }

    .group {
      font-weight: 700;
    }

    .dot {
      color: rgb(120, 124, 126);
      margin: 0 3px;
    }

    .author {
      color: rgb(120, 124, 126);
      font-weight: 500;

      a:hover {
        border-bottom: 1px solid rgb(120, 124, 126);
      }
    }
  }
`;

export const StyledPostFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 2px;
`;

export const PostFooterButton = styled(FooterButton)`
  padding: 8px;
`;