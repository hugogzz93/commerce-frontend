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

export const LOG_IN_JWT_QUERY = gql`
  query LogInJWT($auth_token: String!) {
    loginJWT(auth_token: $auth_token) {
      name
      email
      auth_token
    }
  }
`
export const GET_USERS_FOR_PRODUCT = gql`
  query GetUsersForProduct($product_id: ID!, $userName: String) {
    products(productQuery: {
      id: $product_id,
      userQuery: { name: $userName }
    }) {
      users {
        title: name
        subtitle: id
        id
      }
    }
  }
`


export const GET_PRODUCTS = gql`
  query GetProducts($name: String)
  {
    products(productQuery: {name: $name}) {
      title: name
      id
    }
  }
`;

