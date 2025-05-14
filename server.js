// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/book', (req, res) => {
  console.log('📬 New Booking:', req.body);

  // You can add logic here to email, store, or forward the data
  res.status(200).json({
    message: 'Booking received!',
    data: req.body
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Booking server live on port ${PORT}`);
});
