import { gql } from '@apollo/client';export const SIGN_UP = gql`
  mutation ($password: String!, $login: String!, $email: String!) {
    registr(password: $password, login: $login, email: $email)
  }
`;

export const LOGIN = gql`
  query Login($password: String!, $login: String!) {
    login(password: $password, login: $login)
  }
`;

export const ME = gql`
  query {
    me {
      createdAt
      email
      login
      UID
      updatedAt
    }
  }
`;
