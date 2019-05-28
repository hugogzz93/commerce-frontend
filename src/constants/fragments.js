import gql from 'graphql-tag';

const AddressFragments = {
  fields: gql`
    fragment fields on Address {
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
`
};
export { AddressFragments }
