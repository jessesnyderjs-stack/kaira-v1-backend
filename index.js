const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', (req, res) => {
  const userInput = req.body.message;
  const botReply = `Kaira (offline): You said, "${userInput}" — but I'm not yet connected to a real AI.`;
  res.json({ reply: botReply });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});