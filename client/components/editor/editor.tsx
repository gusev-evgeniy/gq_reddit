import React, { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

// eslint-disable-next-line react/display-name
export const Editor = () => {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      minHeight: 10
      // tools: {
      //   header: Header,
      // },
    });

    return () => {
      editor.isReady.then(() => {
        editor.destroy();
      })
      .catch(e => console.error(`ERROR editor cleanup`, e));
    };
  }, []);

  return (
    <div id='editor'/>
  );
};

