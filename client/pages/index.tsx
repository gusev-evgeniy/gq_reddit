import { useContext } from 'react';
import { Posts } from '../components/posts';
import { Sort } from '../components/sort';
import { Tranding } from '../components/tranding';

import { StyledTopicName } from '../styles';
import { UserContext } from '../context/user';
import { LinkForm } from '../components/editor/linkForm';

export default function Home() {
  const [user,] = useContext(UserContext)!;
  return (
    <>
      <div className='container'>
        {!user && <Tranding />}

        <div className='main_page'>
          <div>
            {!user ? <StyledTopicName>Popular posts</StyledTopicName> : <LinkForm />}
            <Sort />
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}
