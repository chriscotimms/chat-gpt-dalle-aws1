// require("dotenv").config();
// const express = require("express");
// const fetch = require("node-fetch");
// const OpenAI = require("openai");
// const app = express();

// app.get("/api/gpt", async (req, res) => {
//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           prompt:
//             "Translate the following English text to French: 'Hello, world!'",
//           max_tokens: 60,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(505).json({ message: error.message + "didn't work" });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app;

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




app.get('/api/gpt', async (req, res) => {
    const message = req.body.message;
    console.log("Received message from client:", message);
    try {
    const openaiResponse = await generateResponse(message);
    console.log(openaiResponse);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});









module.exports = { app };