const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { request, gql } = require('graphql-request');
const cors = require('cors');
const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/e384c527dbbb48b6a58a975f4dcfd341");
const signer = provider.getSigner();
const propertyRegistryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const propertyRegistryAbi = [
  "function registerProperty(string memory _description) public",
  "function transferProperty(uint256 _propertyId, address _newOwner) public",
  "function getProperty(uint256 _propertyId) public view returns (tuple(uint256 id, string description, address owner))"
];

const propertyRegistryContract = new ethers.Contract(propertyRegistryAddress, propertyRegistryAbi, signer);

async function registerProperty(description) {
  const tx = await propertyRegistryContract.registerProperty(description);
  await tx.wait();
  console.log(`Property registered with description: ${description}`);
}

async function transferProperty(propertyId, newOwner) {
  const tx = await propertyRegistryContract.transferProperty(propertyId, newOwner);
  await tx.wait();
  console.log(`Property ${propertyId} transferred to ${newOwner}`);
}

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://krishsoni:2203031050659@paytm.aujjoys.mongodb.net/PropertyRegistry', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  testTokens: { type: Number, default: 100 },
});

const propertySchema = new mongoose.Schema({
  name: String,
  details: String,
  priceINR: Number,
  priceETH: Number,
});

const User = mongoose.model('User', userSchema);
const Property = mongoose.model('Property', propertySchema);

const endpoint = 'https://gateway-testnet-arbitrum.network.thegraph.com/api/1d9b0c2d45d634923a3ecea952c8aa04/subgraphs/id/FgZp62jkWu3qkmw82Z5xoWMzQws9xYhHtyUHA5gPmja5';

app.get('/', (req, res) => {
  res.send('Welcome to Property Registry API Server');
});

app.get('/properties-with-graph', async (req, res) => {
  let graphData = [];
  try {
    const graphResponse = await axios.post(
      'https://gateway-testnet-arbitrum.network.thegraph.com/api/1d9b0c2d45d634923a3ecea952c8aa04/subgraphs/id/FgZp62jkWu3qkmw82Z5xoWMzQws9xYhHtyUHA5gPmja5',
      {
        query: `
          {
            properties {
              id
              name
              details
              priceINR
              priceETH
              owner {
                id
                walletAddress
              }
            }
          }
        `,
      }
    );
    graphData = graphResponse.data.data.properties;
  } catch (error) {
    console.error('Error fetching properties from Graph:', error.message);
  }

  try {
    const dbProperties = await Property.find().lean();

    const combinedProperties = dbProperties.map(dbProperty => {
      const graphProperty = graphData.find(gp => gp.id === dbProperty._id.toString());
      return {
        ...dbProperty,
        ...(graphProperty || {}),
      };
    });

    res.json(combinedProperties.length > 0 ? combinedProperties : dbProperties);
  } catch (error) {
    console.error('Error fetching properties from MongoDB:', error.message);
    res.status(500).json({ error: 'Failed to fetch properties', details: error.message });
  }
});

app.get('/confirmations', async (req, res) => {
  const confirmationsQuery = gql`
    {
      confirmations(first: 5) {
        id
        owner
        operation
        blockNumber
      }
    }
  `;
  try {
    const data = await request(endpoint, confirmationsQuery);
    res.json(data.confirmations);
  } catch (error) {
    console.error('Error fetching confirmations:', error);
    res.status(500).json({ error: 'Failed to fetch confirmations' });
  }
});

app.get('/revokes', async (req, res) => {
  const revokesQuery = gql`
    {
      revokes(first: 5) {
        id
        owner
        operation
        blockNumber
      }
    }
  `;
  try {
    const data = await request(endpoint, revokesQuery);
    res.json(data.revokes);
  } catch (error) {
    console.error('Error fetching revokes:', error);
    res.status(500).json({ error: 'Failed to fetch revokes' });
  }
});

app.post('/properties', async (req, res) => {
  try {
    const { name, details, priceINR, priceETH, walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    const property = new Property({ name, details, priceINR, priceETH });
    await property.save();

    const mutation = `
      mutation {
        createProperty(input: {
          id: "${property._id}",
          name: "${name}",
          details: "${details}",
          priceINR: ${priceINR},
          priceETH: ${priceETH},
          owner: {
            create: {
              id: "${property._id}",
              walletAddress: "${walletAddress}"
            }
          }
        }) {
          property {
            id
            name
          }
        }
      }
    `;

    await axios.post(
      'https://gateway-testnet-arbitrum.network.thegraph.com/api/1d9b0c2d45d634923a3ecea952c8aa04/subgraphs/id/FgZp62jkWu3qkmw82Z5xoWMzQws9xYhHtyUHA5gPmja5',
      { query: mutation }
    );

    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add property' });
  }
});

app.get('/properties/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

app.post('/register-user', async (req, res) => {
  const { walletAddress } = req.body;

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({ walletAddress });
      await user.save();
    } else {
      user.testTokens += 100;
      await user.save();
    }

    res.json({ id: user._id, walletAddress: user.walletAddress, testTokens: user.testTokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/transfer-property', async (req, res) => {
  const { propertyId, newOwner } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      console.error('Invalid property ID format');
      return res.status(400).json({ error: 'Invalid property ID format' });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      console.error('Property not found');
      return res.status(404).json({ error: 'Property not found' });
    }

    console.log(`Transferring property ${propertyId} to new owner ${newOwner}`);
    await transferProperty(propertyId, newOwner);

    console.log(`Property ${propertyId} successfully transferred to ${newOwner}`);
    res.json({ message: `Property ${propertyId} transferred to ${newOwner}` });
  } catch (error) {
    console.error('Error transferring property:', error);
    res.status(500).json({ error: 'Failed to transfer property', details: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
