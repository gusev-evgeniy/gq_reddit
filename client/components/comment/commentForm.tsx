import { OutputBlockData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import { EditorProps } from '../../types/editor';
import { SubmitButton } from '../dialogs/auth/submitButton';
import { StyledCommentForm } from './styles';

const Editor = dynamic<EditorProps>(() => import('../editor/editor').then(m => m.Editor), {
  ssr: false,
});

export const CommentForm = () => {
  const [blocks, setBlocks] = useState<OutputBlockData[]>([]);

  const disabled = blocks.length === 0;

  return (
    <StyledCommentForm>
      <>
        <Editor onChange={(arr: OutputBlockData[]) => setBlocks(arr)} placeholder='What are your thoughts?' />
        <div className='button_wrapper' id='button' >
          <SubmitButton disabled={disabled} loading={false} onClick={() => console.log('submit')} />
        </div>
      </>
    </StyledCommentForm>
  );
};
