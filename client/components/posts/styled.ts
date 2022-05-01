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