import axios from 'axios'

const GraphQLEndPoint = 'https://graphfront.com/api/graph/u60fa9a9208dfc1bd92589f03b15661548e6409601a4e3455'
const GraphQLApiKey= `k523e64ed86924518e740`

const prepareQuery = (query) => `
  query {
    viewer(apiKey: "${GraphQLApiKey}") ${query}
  }
`
const sendAction = (query, variables={}) => {
  return axios.post(GraphQLEndPoint, {
    query: prepareQuery(query),
  }).then(res => {
    const GraphQLData = res.data.data
    return GraphQLData.viewer
  }).catch(err => {
    debugger
  })
}

export {sendAction}
