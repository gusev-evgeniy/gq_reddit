import React from 'react';
import { StyledTrandItem } from './styles';

export const TrandItem = () => {
  return (
    <StyledTrandItem>
      <div className='image_wrapper'>
        <img
          src='https://steamuserimages-a.akamaihd.net/ugc/1751313186932178647/0785915C272A32AB37AA325175B3B19B18391149/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
          alt='trand'
        />
        <div className='info'>
          <h6>Disco Elisium</h6>
          <p  className='description'>New Image from &rsquo;Disco Elisium&rsquo;</p>
          <p className='author'>r/games</p>
        </div>
      </div>
    </StyledTrandItem>
  );
};
