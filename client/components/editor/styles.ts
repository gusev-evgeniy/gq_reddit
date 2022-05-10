import styled from 'styled-components';
import { ButtonIcon, StyledItem } from '../../styles';

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

export const SubmitTitle = styled.div`
  margin: 15px 0 10px 0;
  width: 100%;
  height: 34px;
  border-bottom: 1px solid #edeff1;

  h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
  }
`;

export const StyledSelectCommunity = styled(StyledItem)`
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  width: 298px;
  height: 38px;
  align-items: center;

  .ava {
    min-width: 22px;
    height: 22px;
    border: 1px dashed #878A8C;
    border-radius: 100%;
    margin-right: 6px;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 600;
  }

  .arrow_button {
    cursor: pointer;
  }
`;

export const EditorForm = styled.form`
  width: 100%;
  height: 100%;
  border: none;
`;