import React from 'react';import { StyledPaddingItem } from '../../styles';
import { StyledSort, StyledSortButton } from './styles';

export const Sort = () => {
  return (
    <StyledPaddingItem>
      <StyledSort>
        <div className='buttons'>
          <StyledSortButton>New</StyledSortButton>
          <StyledSortButton>Hot</StyledSortButton>
        </div>
        <StyledSortButton>Order</StyledSortButton>
      </StyledSort>
    </StyledPaddingItem>
  );
};
