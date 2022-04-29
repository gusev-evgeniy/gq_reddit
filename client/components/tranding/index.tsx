import React from 'react';import { StyledTopicName } from '../../styles';
import { TrandItem } from './trandItem';

export const Tranding = () => {
  return (
    <div className='trands_wrapper'>
      <StyledTopicName>Trending today</StyledTopicName>
      <div className='trands'>
        <TrandItem />
        <TrandItem />
        <TrandItem />
        <TrandItem />
      </div>
    </div>
  );
};
