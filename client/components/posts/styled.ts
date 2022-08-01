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
    width: calc(100% - 40px);

    .title {
      overflow: auto;
    }
  }
`;

export const StyledPostItem = styled(StyledPostSource)`
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const PostRatingWrapper = styled.div<{ isGray: boolean }>`
  padding: 7px;
  width: 40px;
  background-color: ${({ isGray }) => (isGray ? `rgb(248, 249, 250)` : 'inherit')};
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 13px;
    font-weight: 700;
    margin: 3px 0 5px 0;
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

  .bottom {
    height: 20px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: inherit;
    z-index: 10;
  }
`;

export const VoteButton = styled.button`
  background-color: inherit;
  width: 100%;
  height: auto;
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
      width: 30px;
      height: 30px;
      margin-right: 3px;
      border-radius: 100%;
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
      cursor: pointer;

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

export const StyledEmptyPost = styled.div`
  position: relative;
  margin-top: 20px;
`;

export const StyledEmptyText = styled.p`
  position: absolute;
  z-index: 2;
  top: 29%;
  width: fit-content;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  color: #1c1c1c;
`;

export const StyledEmptyPostItem = styled.div`
  width: 100%;
  height: 90px;
  border: 1px solid #d5d8dc;
  padding: 0 0 0 40px;
  margin: 0 0 -1px 0;
  background-color: #e6eaee;

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: fit-content;
    height: 100%;
  }
`;
