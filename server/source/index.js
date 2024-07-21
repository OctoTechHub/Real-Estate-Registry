const express = require('express');
const axios = require('axios');
// 0xB8Cf1d00F959F0F15e21c961814727dEd0aAd139
app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/graph-data', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.thegraph.com/subgraphs/name/darkLooters',
      {
        query: `
          {
            yourQuery {
              id
              name
            }
          }
        `,
      }
    );

    const data = response.data.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from The Graph' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});