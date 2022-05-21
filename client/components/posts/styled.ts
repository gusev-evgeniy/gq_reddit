import styled from 'styled-components';

export const StyledPostItem = styled.div<{ isLarge?: boolean }>`
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;
  border: ${({isLarge}) => isLarge ? 'none' : `1px solid #ccc`};

  .rating {
    background-color: ${({isLarge}) => isLarge ? 'inherit' : `rgb(248, 249, 250)`};
  }

  .body_wrapper {
    padding: 10px;
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

export const TextContent = styled.div<{isLarge?: boolean}>`
  width: 100%;
  max-height: ${({isLarge}) => isLarge ? 'fit-content' :  '250px'};
  overflow: hidden;
  -webkit-mask-image: ${({isLarge}) => isLarge ? 'none' :  'linear-gradient(180deg, #000 60%, transparent)'};

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
`;

export const PostFooterButton = styled.button`
  display: flex;
  background-color: inherit;
  color:  #878A8C;
  font-style: 12px;
  font-weight: 700;
  padding: 8px;
  border-radius: 2px;
  margin-right: 4px;

  span {
    margin-left: 3px;
  }

  :hover {
    background-color: #f6f7f8;
  }

  :disabled {
    cursor: default;

    :hover {
      background-color: inherit;
    }
  }
`;

export const StyledCommentForm = styled.div`
  margin: 40px auto 20px auto;
  min-height: 160px;
  border: 1px solid #EDEFF1;
  border-radius: 4px;
  min-width: 800px;
  padding: 10px;
`;