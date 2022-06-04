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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Block = {
  data: Data;
  id: Scalars['String'];
  type: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  UID: Scalars['String'];
  author: User;
  block: Scalars['JSON'];
  createdAt: Scalars['DateTime'];
  post: Post;
  updatedAt: Scalars['DateTime'];
};

export type CommentsResponse = {
  __typename?: 'CommentsResponse';
  items: Array<Comment>;
  totalCount: Scalars['Float'];
};

export type Data = {
  text: Scalars['String'];
};

export type GetPostResponse = {
  __typename?: 'GetPostResponse';
  items: Array<Post>;
  totalCount: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProfilePicture: Scalars['Boolean'];
  createComment: Scalars['String'];
  createPost: Post;
  logout: Scalars['String'];
  registr: User;
  vote: Post;
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload'];
};


export type MutationCreateCommentArgs = {
  block: Array<Block>;
  post: PostInput;
};


export type MutationCreatePostArgs = {
  block?: InputMaybe<Array<Block>>;
  title: Scalars['String'];
};


export type MutationRegistrArgs = {
  email: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVoteArgs = {
  postUID: VotePostInput;
  value: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  UID: Scalars['String'];
  author: User;
  block: Scalars['JSON'];
  comments: Array<Comment>;
  commentsCount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  myVote?: Maybe<Scalars['Float']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  votesCount: Scalars['Float'];
};

export type PostInput = {
  UID: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getComments: CommentsResponse;
  login?: Maybe<User>;
  me: User;
  post?: Maybe<Post>;
  posts: GetPostResponse;
};


export type QueryGetCommentsArgs = {
  author?: InputMaybe<UserInput>;
  post?: InputMaybe<PostInput>;
};


export type QueryLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type QueryPostArgs = {
  UID: Scalars['String'];
};


export type QueryPostsArgs = {
  skip: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  UID: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  login: Scalars['String'];
  posts: Array<Post>;
  updatedAt: Scalars['DateTime'];
};

export type UserInput = {
  UID: Scalars['String'];
};

export type VotePostInput = {
  UID: Scalars['String'];
};

export type AddProfilePictureMutationVariables = Exact<{
  picture: Scalars['Upload'];
}>;


export type AddProfilePictureMutation = { __typename?: 'Mutation', addProfilePicture: boolean };

export type CreateCommentMutationVariables = Exact<{
  post: PostInput;
  block: Array<Block> | Block;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: string };

export type CreatePostMutationVariables = Exact<{
  block: Array<Block> | Block;
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', UID: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RegistrMutationVariables = Exact<{
  password: Scalars['String'];
  login: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegistrMutation = { __typename?: 'Mutation', registr: { __typename?: 'User', createdAt: any, email: string, login: string, UID: string, updatedAt: any } };

export type VoteMutationVariables = Exact<{
  postUid: VotePostInput;
  value: Scalars['Float'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'Post', myVote?: number | null, UID: string, votesCount: number } };

export type GetCommentsQueryVariables = Exact<{
  author?: InputMaybe<UserInput>;
  post?: InputMaybe<PostInput>;
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: { __typename?: 'CommentsResponse', totalCount: number, items: Array<{ __typename?: 'Comment', UID: string, block: any, createdAt: any, author: { __typename?: 'User', login: string, UID: string } }> } };

export type LoginQueryVariables = Exact<{
  password: Scalars['String'];
  login: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'User', createdAt: any, email: string, login: string, UID: string, updatedAt: any } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', createdAt: any, email: string, login: string, UID: string, updatedAt: any } };

export type GetPostQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', UID: string, title: string, createdAt: any, block: any, votesCount: number, myVote?: number | null, author: { __typename?: 'User', UID: string, login: string } } | null };

export type GetPostsQueryVariables = Exact<{
  skip: Scalars['Float'];
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: { __typename?: 'GetPostResponse', totalCount: number, items: Array<{ __typename?: 'Post', UID: string, title: string, block: any, createdAt: any, votesCount: number, myVote?: number | null, author: { __typename?: 'User', UID: string, login: string } }> } };


export const AddProfilePictureDocument = gql`
    mutation addProfilePicture($picture: Upload!) {
  addProfilePicture(picture: $picture)
}
    `;
export type AddProfilePictureMutationFn = Apollo.MutationFunction<AddProfilePictureMutation, AddProfilePictureMutationVariables>;

/**
 * __useAddProfilePictureMutation__
 *
 * To run a mutation, you first call `useAddProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfilePictureMutation, { data, loading, error }] = useAddProfilePictureMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useAddProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument, options);
      }
export type AddProfilePictureMutationHookResult = ReturnType<typeof useAddProfilePictureMutation>;
export type AddProfilePictureMutationResult = Apollo.MutationResult<AddProfilePictureMutation>;
export type AddProfilePictureMutationOptions = Apollo.BaseMutationOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($post: PostInput!, $block: [Block!]!) {
  createComment(post: $post, block: $block)
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      post: // value for 'post'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($block: [Block!]!, $title: String!) {
  createPost(block: $block, title: $title) {
    UID
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
 *      block: // value for 'block'
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrMutation, RegistrMutationVariables>(RegistrDocument, options);
      }
export type RegistrMutationHookResult = ReturnType<typeof useRegistrMutation>;
export type RegistrMutationResult = Apollo.MutationResult<RegistrMutation>;
export type RegistrMutationOptions = Apollo.BaseMutationOptions<RegistrMutation, RegistrMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($postUid: VotePostInput!, $value: Float!) {
  vote(postUID: $postUid, value: $value) {
    myVote
    UID
    votesCount
  }
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      postUid: // value for 'postUid'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const GetCommentsDocument = gql`
    query GetComments($author: UserInput, $post: PostInput) {
  getComments(author: $author, post: $post) {
    totalCount
    items {
      author {
        login
        UID
      }
      UID
      block
      createdAt
    }
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      author: // value for 'author'
 *      post: // value for 'post'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export const GetPostDocument = gql`
    query GetPost($uid: String!) {
  post(UID: $uid) {
    UID
    title
    createdAt
    block
    votesCount
    myVote
    author {
      UID
      login
    }
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
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
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
export const GetPostsDocument = gql`
    query GetPosts($skip: Float!) {
  posts(skip: $skip) {
    totalCount
    items {
      UID
      title
      block
      createdAt
      votesCount
      myVote
      author {
        UID
        login
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;