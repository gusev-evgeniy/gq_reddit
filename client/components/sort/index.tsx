import React, { FC } from 'react';
import { PostState } from '../../store/slices/posts';
import { StyledPaddingItem } from '../../styles';
import { StyledSort, StyledSortButton } from './styles';

type Props = {
  sortedBy: PostState['sort'];
  onChange: (sort: PostState['sort']) => void;
};

export const Sort: FC<Props> = ({ sortedBy, onChange }) => {
  return (
    <StyledPaddingItem>
      <StyledSort>
        <div className='buttons'>
          <StyledSortButton onClick={() => onChange('new')} selected={sortedBy === 'new'}>
            New
          </StyledSortButton>
          <StyledSortButton onClick={() => onChange('best')} selected={sortedBy === 'best'}>
            Hot
          </StyledSortButton>
        </div>
        {/* <StyledSortButton>Order</StyledSortButton> */}
      </StyledSort>
    </StyledPaddingItem>
  );
};
