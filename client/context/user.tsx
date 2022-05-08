import React, { createContext, FC, useState } from 'react';

type Props = {
  children: React.ReactChild;
};

export const UserContext = createContext<any>(null);

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>();
  
  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
