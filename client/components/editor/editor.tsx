import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';

import { EditorProps } from '../../types/editor';

export const Editor: FC<EditorProps> = ({ onChange, placeholder }) => {
  const [loaded, setLoaded] = useState(true);

  useLayoutEffect(() => {
    if (!loaded) {
      const editor = new EditorJS({
        holder: 'editor',
        minHeight: 10,
        placeholder,
        async onChange() {
          const { blocks } = await editor.save();
          onChange(blocks);
        },
      });

    }
  }, [loaded]);

  useEffect(() => {
    return () => {
      setLoaded(false);
    };
  }, []);

  return <div id='editor' />;
};