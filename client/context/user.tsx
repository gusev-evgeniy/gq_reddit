import React, { createContext, Dispatch, FC, SetStateAction, useState } from 'react';
import { MeQuery } from '../generated/graphql';
import { ProviderProps } from './type';

type User = MeQuery['me']|undefined;
type Value =[ User, Dispatch<SetStateAction<User>>|undefined];

export const UserContext = createContext<Value|null>([undefined, undefined]);

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  
  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
