// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/book', async (req, res) => {
  const bookingData = req.body;
  console.log('📬 New Booking Received:', bookingData);

  try {
    // Forward booking data to your n8n webhook - still need to input webhook
    await axios.post('https://YOUR-N8N-URL/webhook/requestFormAgent', bookingData);

    console.log('📨 Booking forwarded to n8n');
    res.status(200).json({
      message: 'Booking received and forwarded to n8n.',
      data: bookingData
    });
  } catch (error) {
    console.error('❌ Error forwarding to n8n:', error.message);
    res.status(500).json({ message: 'Failed to forward to n8n.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Booking server live on port ${PORT}`);
});
