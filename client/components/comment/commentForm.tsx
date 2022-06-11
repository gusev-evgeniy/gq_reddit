import { OutputBlockData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import React, { FC, useEffect, useState } from 'react';

import { Data, useCreateCommentMutation } from '../../generated/graphql';
import { useAppDispatch } from '../../store/hooks';
import { commentsDefault } from '../../store/slices/comments';
import { openPostDefault } from '../../store/slices/openPost';

import { EditorProps } from '../../types/editor';
import { SubmitButton } from '../dialogs/auth/submitButton';
import { StyledCommentForm } from './styles';

const Editor = dynamic<EditorProps>(() => import('../editor/editor').then(m => m.Editor), {
  ssr: false,
});

type Props = {
  postId: string;
};

export const CommentForm: FC<Props> = ({ postId }) => {
  const [block, setBlock] = useState<OutputBlockData<string, Data>[]>([]);

  const dispatch = useAppDispatch();

  const [createComment, { loading, data }] = useCreateCommentMutation();

  const onSubmit = () => {
    createComment({
      variables: { block, post: { UID: postId } }
    });
  };
  
  useEffect(() => {
    if (data?.createComment) {
      setBlock([]);
      dispatch(openPostDefault());
    }

  }, [data]);

  const disabled = block.length === 0;

  return (
    <StyledCommentForm>
      <>
        <Editor onChange={(arr: OutputBlockData<string, Data>[]) => setBlock(arr)} block={block} placeholder='What are your thoughts?' />
        <div className='button_wrapper' id='button' >
          <SubmitButton disabled={disabled} loading={loading} onClick={onSubmit} />
        </div>
      </>
    </StyledCommentForm>
  );
};
