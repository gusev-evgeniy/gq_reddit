import React, { createContext, FC } from 'react';

type Props = {
  children: React.ReactChild;
};
let user: any = {};
  console.log('user33333', user);
const setUser = (data: any) => {
  user = data;
};

export const UserContext = createContext<any>(null);

export const UserProvider: FC<Props> = ({ children }) => {
  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
