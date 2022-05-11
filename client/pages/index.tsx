import { useContext, useEffect } from 'react';
import { Dialogs } from '../components/dialogs';
import { NavWrapper } from '../components/navigations.tsx';
import { Posts } from '../components/posts';
import { Sort } from '../components/sort';
import { Tranding } from '../components/tranding';

import { StyledTopicName } from '../styles';
import { UserContext } from '../context/user';
import { useMeQuery } from '../generated/graphql';
import { LinkForm } from '../components/editor/linkForm';
import { DialogContext } from '../context/dialog';
import useIsomorphicLayoutEffect from '../hook/useIsomorphicLayoutEffect';

//TODO
// 1. DIALOG out from home page(something like portal in React)
// 2. getMe out from home page (fetch on start app. from any page)
// 3. fix context or use stateManager(mobx or redux toolkit)


export default function Home() {
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
      <NavWrapper >
        <div className='container'>
          {!user && <Tranding />}

          <div className='main_page'>
            <div>
              {!user ? (
                <StyledTopicName>Popular posts</StyledTopicName>
              ) : (
                <LinkForm />
              )}
              <Sort />
              <Posts />
            </div>
          </div>
        </div>
      </NavWrapper>

      <Dialogs />
    </>
  );
}
