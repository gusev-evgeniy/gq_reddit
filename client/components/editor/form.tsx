import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { StyledItem } from '../../styles';
import { EditorForm, FormWrapper, TitleTextArea } from './styles';
import TextareaAutosize from 'react-textarea-autosize';
import { PaintedNavButton } from '../navigations.tsx/styles';
import { EditorProps } from '../../types/editor';

const Editor = dynamic<any>(() => import('./editor').then(m => m.Editor), {
  ssr: false,
});

const MAX_TITLE_LENGTH = 300;

export const Form = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState<string|null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  console.log('[blocks', blocks);

  const onKeyChange = ({ target }: any) => {
    setTitle(target.value);
  };

  const onChange = (text: string) => {
    setText(text);
  };

  const disabled = title.length === 0;

  const onSubmit = () => {
    console.log('text', text);
    console.log('title', title);
  };

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
        <Editor initialBlocks={[]} onChange={(arr) => setBlocks(arr)}/>
        <div className='button_wrapper'>
          <PaintedNavButton disabled={disabled} onClick={onSubmit}>Submit</PaintedNavButton>
        </div>
      </EditorForm>
    </FormWrapper>
  );
};
