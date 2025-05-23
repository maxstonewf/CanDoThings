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
    const response = await axios.post(
      'https://n8n-render-host-nju6.onrender.com/webhook/requestFormAgent',
      bookingData
    );

    console.log('📨 Booking forwarded to n8n:', response.status);
    res.status(200).json({
      message: 'Booking received and forwarded to n8n.',
      data: bookingData
    });
  } catch (error) {
    console.error('❌ Error forwarding to n8n:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Message:', error.message);
    }
    res.status(500).json({ message: 'Failed to forward to n8n.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Booking server live on port ${PORT}`);
});
