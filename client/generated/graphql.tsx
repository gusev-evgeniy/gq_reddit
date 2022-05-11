import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  registr: User;
};


export type MutationRegistrArgs = {
  email: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  login: User;
  me: User;
};


export type QueryLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  UID: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  login: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RegistrMutationVariables = Exact<{
  password: Scalars['String'];
  login: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegistrMutation = { __typename?: 'Mutation', registr: { __typename?: 'User', createdAt: any, email: string, login: string, UID: string, updatedAt: any } };

export type LoginQueryVariables = Exact<{
  password: Scalars['String'];
  login: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'User', createdAt: any, email: string, login: string, UID: string, updatedAt: any } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', createdAt: any, email: string, login: string, UID: string, updatedAt: any } };


export const RegistrDocument = gql`
    mutation Registr($password: String!, $login: String!, $email: String!) {
  registr(password: $password, login: $login, email: $email) {
    createdAt
    email
    login
    UID
    updatedAt
  }
}
    `;
export type RegistrMutationFn = Apollo.MutationFunction<RegistrMutation, RegistrMutationVariables>;

/**
 * __useRegistrMutation__
 *
 * To run a mutation, you first call `useRegistrMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrMutation, { data, loading, error }] = useRegistrMutation({
 *   variables: {
 *      password: // value for 'password'
 *      login: // value for 'login'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegistrMutation(baseOptions?: Apollo.MutationHookOptions<RegistrMutation, RegistrMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions};
        return Apollo.useMutation<RegistrMutation, RegistrMutationVariables>(RegistrDocument, options);
      }
export type RegistrMutationHookResult = ReturnType<typeof useRegistrMutation>;
export type RegistrMutationResult = Apollo.MutationResult<RegistrMutation>;
export type RegistrMutationOptions = Apollo.BaseMutationOptions<RegistrMutation, RegistrMutationVariables>;
export const LoginDocument = gql`
    query Login($password: String!, $login: String!) {
  login(password: $password, login: $login) {
    createdAt
    email
    login
    UID
    updatedAt
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      login: // value for 'login'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions};
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions};
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const MeDocument = gql`
    query ME {
  me {
    createdAt
    email
    login
    UID
    updatedAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions};
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions};
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;