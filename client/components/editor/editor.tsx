import React, { useEffect, useLayoutEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';

export const Editor = () => {
  const [text, setText] = useState<string|null>(null);
  const [test, setTest] = useState(true);
  
  useLayoutEffect(() => {
    if (!test) {
      new EditorJS({
        holder: 'editor',
        minHeight: 10,
        placeholder: 'Text (optional)'
      });

    }

  }, [test]);

  useEffect(() => {
    return () => {
      setTest(false);
    };
  }, []);

  const onTest = ({ target }: any) => {
    setText(target.innerHTML);
  };

  return <div id='editor' onKeyUp={e => onTest(e)} onClick={e => onTest(e)}/>;
};

