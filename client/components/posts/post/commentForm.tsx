import { OutputBlockData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import { EditorProps } from '../../../types/editor';
import { StyledCommentForm } from '../styled';

const Editor = dynamic<EditorProps>(() => import('../../editor/editor').then(m => m.Editor), {
  ssr: false,
});

export const CommentForm = () => {
  const [blocks, setBlocks] = useState<OutputBlockData[]>([]);
  console.log('blocks', blocks);

  return (
    <StyledCommentForm>
      <div>
        <Editor onChange={(arr: OutputBlockData[]) => setBlocks(arr)} />
      </div>
    </StyledCommentForm>
  );
};
