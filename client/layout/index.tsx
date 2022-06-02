import React, { FC, useEffect } from 'react';

import { selectDialog } from '../store/slices/dialog';
import { setMe } from '../store/slices/me';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { useMeQuery } from '../generated/graphql';

import useIsomorphicLayoutEffect from '../hook/useIsomorphicLayoutEffect';
import { Dialogs } from '../components/dialogs';
import { Navigation } from '../components/navigations.tsx';


type Props = {
  children: React.ReactChild;
};

const Layout: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const dialog = useAppSelector(selectDialog);

  const { data, loading } = useMeQuery();

  useIsomorphicLayoutEffect(() => {
    if (data) {
      dispatch(setMe(data.me));
    }
  }, [data]);

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
    </>
  );
};

export default Layout;
