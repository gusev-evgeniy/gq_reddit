import { useContext } from 'react';
import { Posts } from '../components/posts';
import { Sort } from '../components/sort';
import { Tranding } from '../components/tranding';

import { Grid, StyledTopicName } from '../styles';
import { UserContext } from '../context/user';
import { LinkForm } from '../components/editor/linkForm';

//TODO login data return undefined;

export default function Home() {
  const [user,] = useContext(UserContext)!;

  return (
    <>
      <div className='container'>
        {!user && <Tranding />}

        <Grid>
          <div>
            {!user ? <StyledTopicName>Popular posts</StyledTopicName> : <LinkForm />}
            <Sort />
            <Posts />
          </div>
        </Grid>
      </div>
    </>
  );
}
