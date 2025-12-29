const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are Kaira, a thoughtful and uplifting digital assistant.',
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const reply = groqResponse.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error from GROQ API:', error.response?.data || error.message);
    res.status(500).json({ error: 'An error occurred while fetching response from Kaira.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
