import { ApolloProvider, useLazyQuery, useQuery } from '@apollo/client';import { useEffect, useState } from 'react';

import { client } from '../api';

import { Dialogs } from '../components/dialogs';
import { NavWrapper } from '../components/navigations.tsx';
import { Posts } from '../components/posts';
import { Sort } from '../components/sort';
import { Tranding } from '../components/tranding';

import { DialogType } from '../types/dialog';

import { StyledTopicName } from '../styles';
import { ME } from '../api/auth';

export default function Home() {
  const [dialog, setDialog] = useState<DialogType | undefined>();
  const [getMe, { loading, error }] = useLazyQuery(ME);

  const onOpenDialog = (type: DialogType) => setDialog(type);
  const onClose = () => setDialog(undefined);
  console.log('error', error);
  console.log('loading', loading);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getMe();
      return data;
    }

    try {
      const data = fetchData();
      console.log('data3333', data);
    } catch (error) {
        console.log('error', error);
    }
  }, []);


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
