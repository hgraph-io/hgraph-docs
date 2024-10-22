---
sidebar_position: 5
---

# Common queries

## Get the latest transaction timestamp

**Note:** A `consensus_timestamp` is in nano-seconds. You can use online tools such as https://www.epochconverter.com to convert to a human readable date.

```javascript
import {fetch} from 'undici'

async function authenticateWithHgraph() {
  const response = await fetch('https://testnet.hedera.api.hgraph.io/v1/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': '<API_KEY>',
    },
    body: {
      query:
        'query LatestTransaction {\\n transaction(limit: 1, order_by: {consensus_timestamp: desc}) {\\n consensus_timestamp\\n }\\n}\\n',
    },
  })

  const json = response.json()

  // Do what you like with the data
  console.log(json)
}

authenticateWithHgraph()
```

## Get messages from topic id

Getting topic id messages through an api call is helpful to be able to easily read this information without needing to do a transaction through the Hedera SDKs.

```javascript
// Don't use format 0.0.xxxxxx for account ids, token ids, or topic ids.
// Instead only use the integers after the 0.0. when talking to the API
const topicId = 1319899

const endpoint = 'https://testnet.hedera.api.hgraph.io/v1/graphql'

// Create query for getting topic messages
const headers = {
  'content-type': 'application/json',
  'x-api-key': '<API_KEY> ',
}
const topicMessagesQuery = {
  operationName: 'GetMessages',
  query: `query GetMessages($topicId: bigint) {
            topic_message(where: {topic_id: {_eq: $topicId}}, order_by: {consensus_timestamp: desc}) {
                message
                sequence_number
                consensus_timestamp
            }
        }`,
  variables: {
    topicId: topicId,
  },
}

// This example shows how to use axios npm package
// to call Hgraph.io
const queryResponse = await axios({
  url: endpoint,
  method: 'post',
  headers: headers,
  data: topicMessagesQuery,
})

// Map to topic messages
const topicMessages = queryResponse.data.data.topic_message
```

## Get NFT metadata string

When interacting with NFTs, it's important to be able to easily get the metadata string so you can execute logic based off of the metadata object variables.

This query will get the metadata string for a specific NFT by its token id and serial number.

```javascript
// Example API call for token information
const queryVariables = {
  tokenId: 621100,
  serialNumber: 1,
}

// GraphQL call to get token information
const GetNftInfo = `
  nft(where: {serial_number: {_eq: $serialNumber}, token_id: {_eq: $tokenId}}) {
      metadata
  }
`

const body = {query: GetNftInfo, variables: queryVariables}

// Fetch call to post the GraphQL call to hgraph.io
// Set process.env.HGRAPH_API_KEY in your .env file or replace "process.env.HGRAPH_API_KEY with your key
const response = await fetch('https://testnet.hedera.api.hgraph.io/v1/graphql', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.HGRAPH_API_KEY,
    'content-type': 'application/json',
  },
  body: JSON.stringify(body),
})

// Get JSON from fetch response
const res = await response.json()
```

# Function to convert encoded metadata strings

Metadata values are returned in an encoded format. This helper function easily decodes that value into the expected string in the message.

```javascript
// Taking the reponse from the previous example:
// Map new variable to returned data.
const nft = res.data.data.nft

// Function used to convert hex ASCII (encoding of metadata on mainnet) to text
const getMetadataString = (hexx) => {
  let hex = hexx.toString() //force conversion
  hex = hex.split('\\x')[1]
  let str = ''
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  return str
}

// Convert metadata string to usable IPFS CID string
const metadataString = getMetadataString(nft.metadata)
```

## Sense token associated with an account id

A very common piece of data needed by developers is knowing whether a certain account id has a token id associated. Without the account id associating a particular token id, a developer cannot send tokens to that account.

This function allows developers to easily determine association by passing in the account id and token id in question.

```javascript
// Sense if an account has associated the token id.
// If not, create transactions and send to client
const senseTokenAssociation = async (accountId, tokenId) => {
  // Set headers for hgraph.io
  const tokenAssociationEndpoint = 'https://testnet.hedera.api.hgraph.io/v1/graphql'
  const tokenAssociationHeaders = {
    'content-type': 'application/json',
    'x-api-key': process.env.HGRAPH_SECRET,
  }

  // Call and sense token Association
  // token ids and account ids for queries
  const tokenAssociationQuery = {
    operationName: 'GetTokenAssociation',
    query: `query GetTokenAssociation($accountId: bigint, $tokenId: bigint) {
            token_account(where: {token_id: {_eq: $tokenId}, account_id: {_eq: $accountId}}) {
                associated
            }
        }`,
    variables: {
      accountId: accountId.split('.0.')[1],
      tokenId: tokenId.split('.0.')[1],
    },
  }

  // Example using axios npm package to post GraphQL query
  const userTokenAssociationQueryResponse = await axios({
    url: tokenAssociationEndpoint,
    method: 'post',
    headers: tokenAssociationHeaders,
    data: tokenAssociationQuery,
  })

  // Get data from response
  const data = userTokenAssociationQueryResponse.data
  const tokenAccount = data.data.token_account

  let associated = tokenAccount.length >= 1

  return {associated: associated}
}
```

## Get NFTs held by account id

This query will return all of the NFTs held by a particular account id. In this example, the account id being passed to the function is in the standard entity id format (0.0.XXXXXXX).

```javascript
// Get all NFTs being held by an account id
// Example input: accountId = "0.0.306412"
const getNftsHeldByAccountId = async (accountId) => {
  const endpoint = 'https://testnet.hedera.api.hgraph.io/v1/graphql'
  const headers = {
    'content-type': 'application/json',
    'x-api-key': process.env.HGRAPH_SECRET,
  }

  const nftsHeldByAccountIdQuery = {
    operationName: 'GetAccountNfts',
    query: `query GetAccountNfts($accountId: bigint) {
            nft(where: {account_id: {_eq: $accountId}}, order_by: {modified_timestamp: desc}) {
              account_id
              serial_number
              metadata
              token_id
              created_timestamp
              token {
                name
                treasury_account_id
              }
            }
          }`,
    variables: {
      accountId: accountId.split('0.0.')[1],
    },
  }
  const nftsHeldByAccountIdQueryResponse = await axios({
    url: endpoint,
    method: 'post',
    headers: headers,
    data: nftsHeldByAccountIdQuery,
  })

  // Get data from response
  const data = nftsHeldByAccountIdQueryResponse.data
  const nftsHeld = data.data.nft

  for (let index = 0; index < nftsHeld.length; index++) {
    const nftHeld = nftsHeld[index]
    // Uses previous metadata string function in example above
    nftHeld.metadata = getMetadataString(nftHeld.metadata)
    nftHeld.name = nftHeld.token.name
    nftHeld.treasury_account_id = nftHeld.token.treasury_account_id
  }

  return nftsHeld
}
```