import { gql } from '@apollo/client';
export const SIGN_UP = gql`
  mutation Registration($password: String!, $login: String!, $email: String!) {
    registr(password: $password, login: $login, email: $email)
  }
`;

export const LOGIN = gql`
  query Login($password: String!, $login: String!) {
    login(password: $password, login: $login)
  }
`;
