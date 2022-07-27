import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

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
    border: 1px dashed #878a8c;
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

export const EditorForm = styled.div`
  width: 100%;
  min-height: 70vh;
  height: 70vh;
  border: none;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-left: 15px;
`;

export const TitleTextArea = styled.div`
  position: relative;
  margin: 10px;

  textarea {
    padding: 10px 68px 10px 10px;
    border: 1px solid #edeff1;
    background-color: inherit;
    border-radius: 4px;
  }

  .title_length {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 13px;
    color: #9d9fa1;
    font-weight: 500;
  }
`;

export const StyledTextareaAutosize = styled(TextareaAutosize)`
  resize: none;
  font-size: 16px;
  font-weight: 500;
  color: #1c1c1c;
  width: 100%;
  border: none;
  outline: none;
  min-height: 38px;
  padding: 10px 10px 10px 10px;

  ::-webkit-scrollbar {
    display: none;
  }

  :focus {
    border-color: black;
  }
`;

export const FormWrapper = styled(StyledItem)`
  padding-bottom: 50px;
  position: relative;

  .button_wrapper {
    width: 100px;
    height: 36px;
    position: absolute;
    right: 30px;
    bottom: 10px;
  }
`;
