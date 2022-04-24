import { FC } from 'react';

type Props = {
  children: React.ReactChild;
};

export const NavWrapper: FC<Props> = ({ children }) => {
  return (
    <>
    <nav>
    Rain from above!
</nav>
{children}
    </>
  );
};
