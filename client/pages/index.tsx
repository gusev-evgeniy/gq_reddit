import { NavWrapper } from '../components/navigations.tsx';import { Sort } from '../components/sort';
import { Tranding } from '../components/tranding';
import { StyledTopicName } from '../styles';

export default function Home() {
  return (
    <div>
      <NavWrapper>
        <div className='container'>
          <Tranding />
          <div className='main_page'>
            <div>
              <StyledTopicName>Popular posts</StyledTopicName>

              <Sort />
            </div>
          </div>
        </div>
      </NavWrapper>
    </div>
  );
}
