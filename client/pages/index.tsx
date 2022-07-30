import { useAppSelector } from '../store/hooks';
import { selectMe } from '../store/slices/me';

import { Posts } from '../components/posts';
import { LinkForm } from '../components/editor/linkForm';

import { Grid } from '../styles';

export default function Home() {
  const { data } = useAppSelector(selectMe);

  return (
    <>
      {/* {!data && <Tranding />} */}

      <Grid>
        <div>
          {/* {!data ? <StyledTopicName>Popular posts</StyledTopicName> : <LinkForm />} */}
          {data && <LinkForm photo={data.photo as string} login={data.login}/>}
          <Posts emptyText='No posts yet'/>
        </div>
        <div className='sub'></div>
      </Grid>
    </>
  );
}
