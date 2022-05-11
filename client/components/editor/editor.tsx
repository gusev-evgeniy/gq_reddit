import React, { useEffect, useState } from 'react';
import Header from '@editorjs/header';
import EditorJS from '@editorjs/editorjs';

//TODO remove it
let loaded = false;

export const Editor = () => {
  const [text, setText] = useState<string|null>(null);
  console.log('text', text);

  useEffect(() => {
    if (loaded) return;

    const editor = new EditorJS({
      holder: 'editor',
      minHeight: 10,
      tools: {
        header: Header,
      },
      placeholder: 'Text (optional)'
    });

    loaded = true;
  }, []);

  const onTest = ({ target }: any) => {
    setText(target.innerHTML);
  };

  return <div id='editor' onKeyUp={e => onTest(e)} onClick={e => onTest(e)}/>;
};

