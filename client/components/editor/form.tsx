import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { OutputBlockData } from '@editorjs/editorjs';

import { EditorProps } from '../../types/editor';

import { EditorForm, FormWrapper, TitleTextArea } from './styles';
import { useCreatePostMutation } from '../../generated/graphql';
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

  const [setCreate, { loading, data, error }] = useCreatePostMutation();
  console.log('data', data);

  if (data?.createPost) {
    dispatch(openPostDefault());
    router.push(`/post/${data?.createPost.UID}`);
  }

  const onKeyChange = ({ target }: any) => {
    setTitle(target.value);
  };

  const onSubmit = () => {
    setCreate({
      variables: { title, block: blocks }
    });
  };

  const disabled = title.length === 0;
  
  return (
    <FormWrapper>
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
      <EditorForm>
        <Editor onChange={(arr: OutputBlockData[]) => setBlocks(arr)} placeholder='Text (optional)'/>
      </EditorForm>
      <div className='button_wrapper'>
        <SubmitButton disabled={disabled} loading={loading} onClick={onSubmit}/>
      </div>
    </FormWrapper>
  );
};
