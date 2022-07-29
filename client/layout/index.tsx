import React, { FC, useEffect } from 'react';

import { selectDialog } from '../store/slices/dialog';
import { setMe } from '../store/slices/me';
import { useAppDispatch, useAppSelector } from '../store/hooks';


import { useMeQuery } from '../generated/graphql';

import { Dialogs } from '../components/dialogs';
import { Navigation } from '../components/navigations';
import { Chat } from '../components/chat';

type Props = {
  children: React.ReactChild;
};

const Layout: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);

  const { loading } = useMeQuery({
    onCompleted({ me }) {
      dispatch(setMe(me));
    },
  });

  useEffect(() => {
    document.body.style.overflow = dialog ? 'hidden' : 'auto';
  }, [dialog]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Dialogs />
      {/* <Chat /> */}
    </>
  );
};

export default Layout;
