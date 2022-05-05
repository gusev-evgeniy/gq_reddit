import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';

import { client } from '../api';

import { Dialogs } from '../components/dialogs';
import { NavWrapper } from '../components/navigations.tsx';
import { Posts } from '../components/posts';
import { Sort } from '../components/sort';
import { Tranding } from '../components/tranding';

import { DialogType } from '../types/dialog';

import { StyledTopicName } from '../styles';

export default function Home() {
  const [dialog, setDialog] = useState<DialogType | undefined>();

  const onOpenDialog = (type: DialogType) => setDialog(type);
  const onClose = () => setDialog(undefined);

  useEffect(() => {
    if (dialog) {
      document.body.style.overflow = 'hidden';
    }
  }, [dialog]);

  return (
    <ApolloProvider client={client}>
      <NavWrapper onOpenDialog={onOpenDialog}>
        <div className='container'>
          <Tranding />
          <div className='main_page'>
            <div>
              <StyledTopicName>Popular posts</StyledTopicName>
              <Sort />
              <Posts />
            </div>
          </div>
        </div>
      </NavWrapper>
      {dialog && <Dialogs type={dialog} onClose={onClose}/>}
    </ApolloProvider>
  );
}
