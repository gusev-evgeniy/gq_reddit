import styled from "styled-components";
import { StyledItem } from "../../styles";

export const StyledMenu = styled(StyledItem)<{ left: number, top: number }>`
  position: absolute;
  left: ${props => props.left || 0}px;
  top: ${props => props.top || 0}px;
  z-index: 100;
  width: 180px;
  transform: translateX(-50%);
  
  ul {
    display: flex;
    flex-direction: column;

    li:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
  }
`;



export const MenuItem = styled.li`
  width: 100%;
  height: 40px;
  padding: 0 20px;
  text-align: center;
  font-weight: 600;
  vertical-align: baseline;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: #f6f7f8;
  }
`;