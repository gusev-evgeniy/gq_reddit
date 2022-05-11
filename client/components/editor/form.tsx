import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { StyledItem } from '../../styles';
import { EditorForm, FormWrapper, TitleTextArea } from './styles';
import TextareaAutosize from 'react-textarea-autosize';
import { PaintedNavButton } from '../navigations.tsx/styles';

const Editor = dynamic<object>(() => import('./editor').then(m => m.Editor), {
  ssr: false,
});

const MAX_TITLE_LENGTH = 300;

export const Form = () => {
  const [title, setTitle] = useState('');

  const onKeyChange = ({ target }: any) => {
    setTitle(target.value);
  };

  const disabled = title.length === 0;

  return (
    <FormWrapper>
      <EditorForm>
        <TitleTextArea>
          <span className='title_length'>
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
          <TextareaAutosize
            rows={1}
            maxLength={MAX_TITLE_LENGTH}
            placeholder='Tile'
            onKeyDown={e => onKeyChange(e)}
          />
        </TitleTextArea>
        <Editor />
        <div className='button_wrapper'>
          <PaintedNavButton disabled={disabled}>Submit</PaintedNavButton>
        </div>
      </EditorForm>
    </FormWrapper>
  );
};
