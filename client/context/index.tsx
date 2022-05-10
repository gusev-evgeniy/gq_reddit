import React, { FC } from 'react';import { DialogProvider } from './dialog';
import { ProviderProps } from './type';
import { UserProvider } from './user';

import { client } from '../api';
import { ApolloProvider } from '@apollo/client';

export const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <DialogProvider>{children}</DialogProvider>
      </UserProvider>
    </ApolloProvider>
  );
};
