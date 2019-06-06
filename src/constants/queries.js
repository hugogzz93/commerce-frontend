import gql from 'graphql-tag'
import * as Fragments from './fragments.js'

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CategoryInput!) {
    category {
      create(input: $input) {
        ...categoryFields
        products {
          id
        }
      }
    }
  }
  ${Fragments.CategoryFragments.fields}
`
export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      ...categoryFields
      products {
        id
      }
    }
  }
  ${Fragments.CategoryFragments.fields}
`
