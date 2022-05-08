import { ApolloProvider, useLazyQuery, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';

import { client } from '../api';

import { Dialogs } from '../components/dialogs';
import { NavWrapper } from '../components/navigations.tsx';
import { Posts } from '../components/posts';
import { Sort } from '../components/sort';
import { Tranding } from '../components/tranding';

import { DialogType } from '../types/dialog';

import { StyledTopicName } from '../styles';
import { ME } from '../api/auth';
import { UserContext } from '../context/user';

export default function Home() {
  const [dialog, setDialog] = useState<DialogType | undefined>();
  const [user, setUser] = useContext(UserContext);
  const { data } = useQuery(ME);

  const onOpenDialog = (type: DialogType) => setDialog(type);
  const onClose = () => setDialog(undefined);
  console.log('user3333', user);

  useEffect(() => {
    if (data) {
      console.log(';data.me', data.me);
      setUser(data.me);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (dialog) {
      document.body.style.overflow = 'hidden';
    }
  }, [dialog]);

  return (
    <>
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
      {dialog && <Dialogs type={dialog} onClose={onClose} />}
    </>
  );
}
