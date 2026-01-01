const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o'; // or use 'gpt-4o-mini' if that's the final tag when available

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const openaiResponse = await axios.post(
      OPENAI_API_URL,
      {
        model: OPENAI_MODEL,
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
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = openaiResponse.data.choices[0].message.content;
    res.json({ response: reply });

  } catch (error) {
    console.error('Error from OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'An error occurred while fetching response from Kaira.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
