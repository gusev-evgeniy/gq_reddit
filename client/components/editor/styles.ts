import styled from "styled-components";
import { ButtonIcon, StyledItem } from "../../styles";

export const StyledEditorLink = styled(StyledItem)`
  margin-bottom: 10px;
  display: flex;
  padding: 5px;
  align-items: center;

  .ava_wrapper {
    min-width: 40px;
    height: 40px;
    margin-right: 5px;
  }
`;

export const AddImage = styled(ButtonIcon)`
  height: 36px;
  width: 36px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;