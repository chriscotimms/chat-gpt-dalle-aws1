// const server = require("./server.js");

const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const { callOpenAi } = require("./openai");

const staticHandler = express.static("public");
app.use(staticHandler);

const messageHistory = [];
const addMsg = (id, msg) => {
  const result = {
    role: id,
    content: msg,
  };
  messageHistory.unshift(result);
};

app.get("/OAI", async (request, response) => {
  const html = "";
  response.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <link rel="stylesheet" href="/style.css">
  </head>
  <body>
  <header>
  <form action="/OAI" method="POST">
  <li>
  <input type="text" id="message" name="message" placeholder="Message"/>
  </li>
  </form>
  </header>
  <main>
  ${html}
  </main>
  </body>
  </html>   
  `);
});
const bodyParser = express.urlencoded({ extended: true });

app.post("/OAI", bodyParser, async (request, response) => {
  const contentForOAI = request.body.message;
  // console.log("message entered", contentForOAI);

  try {
    const openaiResponse = await callOpenAi(contentForOAI);
    // console.log(openaiResponse);
    addMsg("assistant", openaiResponse);
    addMsg("user", contentForOAI);
    // console.log(messageHistory);

    const list = messageHistory.map(
      (num) => `<li class="${num.role}">${num.content}</li>`
    );
    console.log(list);
    const html = `<ul class="chat">${list.join("")}</ul>`;
    console.log(html);

    response.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <link rel="stylesheet" href="/style.css">
    </head>
    <body>
    <header>
    <form action="/OAI" method="POST">
    <li>
    <input type="text" id="message" name="message" placeholder="Message"/>
    </li>
    </form>
    </header>
    <main>
    ${html}
    </main>
    </body>
    </html>  
  `);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
