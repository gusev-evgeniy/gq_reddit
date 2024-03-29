import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { OutputBlockData } from '@editorjs/editorjs';

import { EditorProps } from '../../types/editor';

import { EditorForm, FormWrapper, StyledTextareaAutosize, TitleTextArea } from './styles';
import { Block, useCreatePostMutation } from '../../generated/graphql';
import { SubmitButton } from '../dialogs/auth/submitButton';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../store/hooks';
import { openPostDefault } from '../../store/slices/openPost';

const Editor = dynamic<EditorProps>(() => import('./editor').then(m => m.Editor), {
  ssr: false,
});

const MAX_TITLE_LENGTH = 300;

export const Form = () => {
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<OutputBlockData[]>([]);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [setCreate, { loading }] = useCreatePostMutation({
    variables: { title: title.trim(), block: blocks as Block[] },
    onCompleted({ createPost }) {
      dispatch(openPostDefault());
      router.push(`/post/${createPost.UID}`);
    },
  });

  const onKeyChange = ({ target }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTitle((target as HTMLTextAreaElement).value);
  };

  const onSubmit = () => {
    setCreate();
  };

  return (
    <FormWrapper>
      <TitleTextArea>
        <span className='title_length'>
          {title.length}/{MAX_TITLE_LENGTH}
        </span>
        <StyledTextareaAutosize
          rows={1}
          maxLength={MAX_TITLE_LENGTH}
          placeholder='Tile'
          onKeyDown={e => onKeyChange(e)}
        />
      </TitleTextArea>
      <EditorForm>
        <Editor onChange={(arr: OutputBlockData[]) => setBlocks(arr)} placeholder='Text (optional)' />
      </EditorForm>
      <div className='button_wrapper'>
        <SubmitButton disabled={!title.trim().length} loading={loading} onClick={onSubmit} />
      </div>
    </FormWrapper>
  );
};
