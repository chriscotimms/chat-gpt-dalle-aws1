require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const generateResponse = require("./ai.js");

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

module.exports = { app };