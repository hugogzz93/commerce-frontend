import gql from 'graphql-tag'

export const LOG_IN_MUTATION = gql`
  mutation LogIn( $email: String!, $password: String! ) {
    login(email: $email, password: $password) {
      name
      email
      auth_token
    }
  }
`
