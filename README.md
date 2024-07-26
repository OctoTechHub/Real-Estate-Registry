# Real Estate Registry | The Graph

Buy, sell, and manage your properties with Real Estate Registry (ESR), using The Graph protocol. Track bid and transaction history. Buy in ETH and convert ETH to INR.


## Subgraph | darkLooters

https://testnet.thegraph.com/explorer/subgraphs/FgZp62jkWu3qkmw82Z5xoWMzQws9xYhHtyUHA5gPmja5?view=Query&chain=arbitrum-sepolia

### Query Our Subgraph
```bash
https://gateway-testnet-arbitrum.network.thegraph.com/api/{api-key}/subgraphs/id/FgZp62jkWu3qkmw82Z5xoWMzQws9xYhHtyUHA5gPmja5
```

### Usage

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ confirmations(first: 5) { id owner operation blockNumber } revokes(first: 5) { id owner operation blockNumber } }", "operationName": "Subgraphs", "variables": {}}' \
  https://gateway-testnet-arbitrum.network.thegraph.com/api/{api-key}/subgraphs/id/FgZp62jkWu3qkmw82Z5xoWMzQws9xYhHtyUHA5gPmja5
```

```javascript
const { request, gql } = require('graphql-request');

const endpoint = 'https://gateway-testnet-arbitrum.network.thegraph.com/api/{api-key}/subgraphs/id/FgZp62jkWu3qkmw82Z5xoWMzQws9xYhHtyUHA5gPmja5';

const query = `{
  confirmations(first: 5) {
    id
    owner
    operation
    blockNumber
  }
  revokes(first: 5) {
    id
    owner
    operation
    blockNumber
  }
}`;

async function fetchData() {
  try {
    const data = await request(endpoint, query);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
```


## GraphQL EndPoints

1) propertiesWithGraph

```graphql
query {
  propertiesWithGraph {
    id
    name
    details
    priceINR
    priceETH
    walletAddress
  }
}
```

2) propertiesByWallet

```graphql
query($walletAddress: String!) {
  propertiesByWallet(walletAddress: $walletAddress) {
    id
    name
    details
    priceINR
    priceETH
    walletAddress
  }
}
```

3) confirmations

```graphql
query {
  confirmations {
    id
    blockNumber
    transactionHash
  }
}
```

4) revokes

```graphql
query {
  revokes {
    id
    blockNumber
    transactionHash
  }
}
```

5) createProperty

```graphql
mutation {
  createProperty(
    name: "Test Property"
    details: "This is a test property"
    priceINR: 100
    priceETH: 0.1
    walletAddress: "0x1234567890abcdef"
  ) {
    id
    name
    details
    priceINR
    priceETH
    walletAddress
  }
}
```

6) getProperty

```graphql
query($id: String!) {
  getProperty(id: $id) {
    id
    name
    details
    priceINR
    priceETH
    walletAddress
  }
}
```

7) registerUser

```graphql
mutation {
  registerUser(
    walletAddress: "0x1234567890abcdef"
  ) {
    id
    walletAddress
    testTokens
  }
}
```

8) transferProperty

```graphql
mutation {
  transferProperty(
    propertyId: "1234567890abcdef"
    newOwner: "0x9876543210fedcba"
  ) {
    message
  }
}
```

### Smart Contract 
contract-protocol\contracts\registry.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyRegistry {
    struct Property {
        uint256 id;
        string description;
        address owner;
    }

    mapping(uint256 => Property) public properties;
    uint256 public nextPropertyId;

    event PropertyRegistered(uint256 id, address owner, string description);
    event PropertyTransferred(uint256 id, address from, address to);

    function registerProperty(string memory _description) public {
        properties[nextPropertyId] = Property(nextPropertyId, _description, msg.sender);
        emit PropertyRegistered(nextPropertyId, msg.sender, _description);
        nextPropertyId++;
    }

    function transferProperty(uint256 _propertyId, address _newOwner) public {
        require(properties[_propertyId].owner == msg.sender, "Only the owner can transfer the property");
        properties[_propertyId].owner = _newOwner;
        emit PropertyTransferred(_propertyId, msg.sender, _newOwner);
    }

    function getProperty(uint256 _propertyId) public view returns (Property memory) {
        return properties[_propertyId];
    }
}
```
