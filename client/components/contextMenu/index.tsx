import React, { FC } from 'react';
import { MenuItem, StyledMenu } from './styles';

type Props = {
  left: number;
  top: number;
  items: {
    title: string;
    icon?: string;
    action?: (...args: any) => void;
  }[];
};

export const Menu: FC<Props> = ({ left, top, items }) => {
  console.log('left, top', left, top);
  return (
    <StyledMenu left={left} top={top}>
      <ul>
        {items.map(({ title, action }) => (
          <MenuItem key={title} onClick={action}>
            <p>{title}</p>
          </MenuItem>
        ))}
      </ul>
    </StyledMenu>
  );
};
