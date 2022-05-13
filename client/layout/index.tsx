import React, { FC, useContext, useEffect } from 'react';
import { Dialogs } from '../components/dialogs';
import { Navigation } from '../components/navigations.tsx';
import { DialogContext } from '../context/dialog';
import { UserContext } from '../context/user';
import { useMeQuery } from '../generated/graphql';
import useIsomorphicLayoutEffect from '../hook/useIsomorphicLayoutEffect';

type Props = {
  children: React.ReactChild;
};

const Layout: FC<Props> = ({ children }) => {
  const [user, setUser] = useContext(UserContext)!;
  const [dialog] = useContext(DialogContext);

  const { data, loading } = useMeQuery();

  useIsomorphicLayoutEffect(() => {
    if (data && setUser) {
      setUser(data.me);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (dialog) {
      document.body.style.overflow = 'hidden';
    }
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
