import styled from "styled-components";

export const StyledPostItem = styled.div`
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #ccc;

  .rating {
    background-color: rgb(248,249,250);
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

export const TextContent = styled.div`
  width: 100%;
  max-height: 250px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg,#000 60%,transparent);

  p {
    padding: 0.5em 0 0.25em;
  }
`;

export const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;

  .info {
    display: flex;
    align-items: center;

    .ava_wrapper {
      width: 20px;
      height: 20px;
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