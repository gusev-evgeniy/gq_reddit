import React, { FC, useEffect } from 'react';
import Header from '@editorjs/header';
import EditorJS, {OutputData} from '@editorjs/editorjs';
import { EditorProps } from '../../types/editor';

//TODO remove it
let loaded = false;

interface EditorProps {
  onChange: (blocks: OutputData['blocks']) => void;
  initialBlocks: OutputData['blocks'];
}


export const Editor: FC<EditorProps> = ({ onChange, initialBlocks }) => {
  useEffect(() => {
    if (loaded) return;

    const editor = new EditorJS({
      holder: 'editor',
      minHeight: 10,
      tools: {
        header: Header,
      },
      data: {
        blocks: initialBlocks
      },
      placeholder: 'Text (optional)',
      async onChange() {
        const {blocks} = await editor.save();
        onChange(blocks);
      },

    });

  useEffect(() => {
    return () => {
      setTest(false);
    };
  }, []);

  const onTest = ({ target }: any) => {
    onChange(target.innerHTML);
  };

  return <div id='editor' onKeyUp={e => onTest(e)} onClick={e => onTest(e)}/>;
};

