// const server = require("./server.js");

const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const { callOpenAi } = require("./openai");

const messageHistory = [];
const addMsg = (id, msg) => {
  const result = {
    role: id,
    content: msg,
  };
  messageHistory.unshift(result);
};



app.get("/OAI", async (request, response) => {
  const html = "chat messages here";
  response.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <style>
  </style>
  </head>
  <body>
  <form action="/OAI" method="POST">
  <li>
    <input type="text" id="message" name="message" />
    <label for="message">message</label>
  </li>
  <li class="button">
<button type="submit">ask a question</button>
  </li>
  </form>
  ${html}
  </body>
  </html> 
  `);
});

const bodyParser = express.urlencoded({ extended: true });

app.post("/OAI", bodyParser, async (request, response) => {
  const contentForOAI = request.body.message;
  console.log("message entered", contentForOAI);
  // addMsg("user", contentForOAI);

  // const message = "what is clarity?";

  try {
    const openaiResponse = await callOpenAi(contentForOAI);
    console.log(openaiResponse);
    addMsg("assistant", openaiResponse);
    addMsg("user", contentForOAI);
    console.log(messageHistory);

    const list = messageHistory.map((num) => `<li class="${num.role}">${num.role}: ${num.content}</li>`);
    console.log(list);
    const html = `<ul>${list.join("")}</ul>`;
    console.log(html);

    response.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <style>
  .user {color:red;}
  .assistant {color:green;}
  </style>
  </head>
  <body>
  <form action="/OAI" method="POST">
  <li>
    <input type="text" id="message" name="message" />
    <label for="message">message</label>
  </li>

  <li class="button">
<button type="submit">ask a question</button>
  </li>
  </form>
  ${html}
  </body>
  </html> 
  `);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// app.get("/chatreq", async (req, res) => {
//   // const message = req.body.message;
//   // console.log("Received message from client:", message);
//   const message = "what is clarity?";
//   try {
//     const openaiResponse = await callOpenAi(message);
//     // console.log(openaiResponse);
//     console.log(messageHistory);
//     res.send(openaiResponse);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
