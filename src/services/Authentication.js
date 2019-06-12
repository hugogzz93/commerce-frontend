import cookie from "cookie";
import { sendMutation, sendQuery } from "../lib/api";
import docCookies from "../lib/docCookies";
import gql from "graphql-tag";

const FETCH_CURRENT_USER = gql`
query fetchCurrentUser {
  currentUser {
    id
    name
    email
  }
}
`;

const LOGIN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      authToken
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation signOut {
    error
  }
`;

export const login = ({ email, password }) =>
  sendMutation({
    mutation: LOGIN_MUTATION,
    variables: { email, password }
  });

export const logout = ({ auth_token }) =>
  sendMutation({
    mutation: LOGOUT_MUTATION,
    variables: { auth_token }
  });

export const fetchCurrentUser = () =>
  sendQuery({
    query: FETCH_CURRENT_USER,
    fetchPolicy: 'network-only'
  });

export const setAuthTokenCookie = token => {
  let today = new Date();
  let expires = new Date();
  expires.setTime(today.getTime() + 3600000 * 24 * 14); //14 days from now
  docCookies.setItem(
    "auth_token",
    token,
    expires.toGMTString(),
    "/",
    "localhost"
  );
};

export const getAuthToken = () => docCookies.getItem("auth_token");
