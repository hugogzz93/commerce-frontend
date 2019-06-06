import gql from 'graphql-tag';

export const AddressFragments = {
  fields: gql`
    fragment addressFields on Address {
      id
      country
      fullName
      street1
      street2
      city
      zip
      phone
      securityCode
      instructions
    }
`};

export const CategoryFragments = {
  fields: gql`
    fragment categoryFields on Category {
      id
      name
      description
    }
`};
