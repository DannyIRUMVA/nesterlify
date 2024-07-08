const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/offer_requests', async (req, res) => {
//   console.log('Request Data:', JSON.stringify(req.body, null, 2));

  try {
    const response = await axios.post('https://api.duffel.com/air/offer_requests', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer duffel_test_yJD3QAOfPnZhTZxpRSJHQXlU3w49f1jyueLSkx-W9ET",
        'Duffel-Version': 'v1'
      }
    });
    res.set('Content-Length', response.data.length);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error('Error Message:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
