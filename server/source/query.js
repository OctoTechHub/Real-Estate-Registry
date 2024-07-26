const { request, gql } = require('graphql-request');

const endpoint = 'https://gateway-testnet-arbitrum.network.thegraph.com/api/1d9b0c2d45d634923a3ecea952c8aa04/subgraphs/id/FgZp62jkWu3qkmw82Z5xoWMzQws9xYhHtyUHA5gPmja5';

const query = gql`
  {
    properties(first: 5) {
      id
      name
      details
      priceINR
      priceETH
      owner {
        walletAddress
      }
    }
  }
`;

async function fetchData() {
  try {
    const data = await request(endpoint, query);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error('Response:', error.response);
    console.error('Request:', error.request);
  }
}

fetchData();