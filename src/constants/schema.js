import gql from 'graphql-tag'

export const LOG_IN_MUTATION = gql`
  mutation LogIn( $email: String!, $password: String! ) {
    login(email: $email, password: $password) {
      id
      auth_token
      name,
      email,
      password,
      phone,
      country,
      city,
      street,
      street_2,
      street_number,
      zipcode,
      description,
    }
  }
`

export const LOG_IN_JWT_QUERY = gql`
  query LogInJWT($auth_token: String!) {
    loginJWT(auth_token: $auth_token) {
      id 
      auth_token
      name,
      email,
      password,
      phone,
      country,
      city,
      street,
      street_2,
      street_number,
      zipcode,
      description
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




export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String ,
                      $email: String ,
                      $password: String 
                      $phone: String,
                      $country: String,
                      $city: String,
                      $street: String,
                      $street_2: String,
                      $street_number: String,
                      $zipcode: String,
                      $description: String) {
  user(id: $id) {
    updateUser(input: {
      name: $name,
      email: $email,
      password: $password,
      phone: $phone,
      country: $country,
      city: $city,
      street: $street,
      street_2: $street_2,
      street_number: $street_number,
      zipcode: $zipcode,
      description: $description })
      {
        name,
        email,
        password,
        phone,
        country,
        city,
        street,
        street_2,
        street_number,
        zipcode,
        description
      }
  }
}
`
