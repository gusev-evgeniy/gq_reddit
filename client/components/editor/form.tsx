import dynamic from 'next/dynamic';
import React from 'react';
import { StyledItem } from '../../styles';
import { EditorForm } from './styles';

const Editor = dynamic<object>(() => import('./editor').then(m => m.Editor), {
  ssr: false,
});

export const Form = () => {
  return (
    <StyledItem>
      <EditorForm>
        <div>
          <input type='text' />
        </div>
        <Editor />
          {/* {Editor && <Editor />} */}
      </EditorForm>
    </StyledItem>
  );
};
