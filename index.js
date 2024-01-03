// const server = require("./server.js");

const { OpenAI } = require("openai");
const express = require('express');
const fetch = require('node-fetch');
require("dotenv").config();
const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


async function generateResponse(message) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: message !== undefined ? message : "Hello" },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      n: 1,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}


const message = "what is white?";

app.get('/', async (req, res) => {
    // const message = req.body.message;
    // console.log("Received message from client:", message);
    
    try {
    const openaiResponse = await generateResponse(message);
    console.log(openaiResponse);
    res.send(openaiResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening at http://localhost:${port}`));
