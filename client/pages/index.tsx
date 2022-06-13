import { Posts } from '../components/posts';

import { Grid, StyledTopicName } from '../styles';
import { LinkForm } from '../components/editor/linkForm';
import { useAppSelector } from '../store/hooks';
import { selectMe } from '../store/slices/me';

//TODO fix
//ssr
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
          <Posts />
        </div>
        <div className='sub'></div>
      </Grid>
    </>
  );
}
