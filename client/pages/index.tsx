import { Posts } from '../components/posts';
import { Sort } from '../components/sort';

import { Grid, StyledTopicName } from '../styles';
import { LinkForm } from '../components/editor/linkForm';
import { useAppSelector } from '../store/hooks';
import { selectMe } from '../store/slices/me';

//TODO fix
//login data return undefined
//ssr
//update votesCount and myVote
//update create comment
//navigation sticky

export default function Home() {
  const { data } = useAppSelector(selectMe);

  return (
    <>
      {/* {!data && <Tranding />} */}

      <Grid>
        <div>
          {!data ? <StyledTopicName>Popular posts</StyledTopicName> : <LinkForm />}
          <Sort />
          <Posts />
        </div>
        <div className='sub'></div>
      </Grid>
    </>
  );
}
