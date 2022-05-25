import styled from "styled-components";

export const StyledContent = styled.div<{ isLarge?: boolean }>`
  width: 100%;
  max-height: ${({ isLarge }) => (isLarge ? 'fit-content' : '250px')};
  overflow: hidden;

  -webkit-mask-image: ${({ isLarge }) =>
    isLarge ? 'none' : 'linear-gradient(180deg, #000 60%, transparent)'};

  p {
    padding: 0.5em 0 0.25em;
  }
`;