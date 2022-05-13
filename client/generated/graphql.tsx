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
  createPost: Post;
  registr: Scalars['String'];
};


export type MutationCreatePostArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationRegistrArgs = {
  email: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  UID: Scalars['String'];
  createdAt: Scalars['DateTime'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getPost: Array<Post>;
  login: Scalars['String'];
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

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', text: string, title: string, UID: string, updatedAt: any } };

export type RegistrMutationVariables = Exact<{
  password: Scalars['String'];
  login: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegistrMutation = { __typename?: 'Mutation', registr: string };

export type GetPostQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostQuery = { __typename?: 'Query', getPost: Array<{ __typename?: 'Post', text: string, title: string, UID: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', createdAt: any, email: string, login: string, UID: string, updatedAt: any } };


export const CreatePostDocument = gql`
    mutation CreatePost($text: String!, $title: String!) {
  createPost(text: $text, title: $title) {
    text
    title
    UID
    updatedAt
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const RegistrDocument = gql`
    mutation Registr($password: String!, $login: String!, $email: String!) {
  registr(password: $password, login: $login, email: $email)
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrMutation, RegistrMutationVariables>(RegistrDocument, options);
      }
export type RegistrMutationHookResult = ReturnType<typeof useRegistrMutation>;
export type RegistrMutationResult = Apollo.MutationResult<RegistrMutation>;
export type RegistrMutationOptions = Apollo.BaseMutationOptions<RegistrMutation, RegistrMutationVariables>;
export const GetPostDocument = gql`
    query GetPost {
  getPost {
    text
    title
    UID
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostQuery(baseOptions?: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;