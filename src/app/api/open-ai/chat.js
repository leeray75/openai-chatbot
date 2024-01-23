// pages/api/chat.js
import OpenAI from 'openai';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { text } = req.body;

    // Call OpenAI API
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: text }],
      model: 'gpt-3.5-turbo',
    });

    res.status(200).json({ text: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error('Error sending message to OpenAI:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
