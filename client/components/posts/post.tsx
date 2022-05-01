import React from 'react';
import { StyledPostItem, VoteDown, VoteUp } from './styled';

import vote from '../../images/vote.svg';
import Image from 'next/image';

export const Post = () => {
  return (
      <StyledPostItem>
        <div className='rating'>
          <VoteUp>
            <Image width='30px' height='30px' src={vote} alt='search_icon' />
          </VoteUp>
          <p>18.5k</p>
          <VoteDown>
            <Image width='30px' height='30px' src={vote} alt='search_icon' />
          </VoteDown>
        </div>
        <div>
          <div className='header'>
            <h6 className='author'>r/wallstreetbets</h6>
            <p className='info'>
              Posted by
              <span>u/catbulliesdog</span>
              {` `}
              <span>13 hours ago</span>
              <button>Join</button>
            </p>
          </div>
          <div className='body'>
            <h2 className='title'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, dignissimos.</h2>
            <div className='text'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, modi. Aspernatur, nostrum corporis
              tempora eius mollitia aliquid commodi earum obcaecati dolor soluta sequi vero, error sapiente cumque odit
              nisi dolore dignissimos aperiam! Quas cumque nemo nostrum fugit illo ut debitis commodi aperiam autem
              minima nobis corporis perferendis in nisi quisquam atque magnam praesentium vel, fugiat iure rerum iusto
              blanditiis id. At veritatis facilis sit impedit ex quae. Velit, tenetur repudiandae explicabo rem ex quo
              fugit voluptatum labore? Alias soluta fuga amet, molestiae aspernatur dolores nesciunt quos, modi est in
              accusantium quae quo consectetur ab id deserunt nemo nisi nulla quis voluptatum velit blanditiis?
              Laboriosam vero perferendis veritatis adipisci cum mollitia ipsa praesentium eius repudiandae corrupti est
              fugit cupiditate, excepturi quibusdam vel debitis fuga quia sint rerum numquam similique. Dolore tenetur
              soluta distinctio incidunt totam, dolores animi atque perferendis ea fugiat!
            </div>
          </div>
          <div className='footer'>
            <button>
              <Image width='18px' height='18px' src={vote} alt='search_icon' />
            </button>
            <button>Share</button>
            <button>Save</button>
          </div>
        </div>
      </StyledPostItem>
  );
};
