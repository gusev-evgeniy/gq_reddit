import styled from "styled-components";

export const Ava = styled.div<{ backgroundImage?: string }>`
  border-radius: 100%;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  cursor: pointer;
  background-size: cover;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})` || ''};
`;