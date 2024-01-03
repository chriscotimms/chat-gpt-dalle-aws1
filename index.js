// const server = require("./server.js");

const express = require('express');
const fetch = require('node-fetch');
require("dotenv").config();
const app = express();
const {callOpenAi} = require("./openai")


const message = "what is clarity?";

app.get('/', async (req, res) => {
    // const message = req.body.message;
    // console.log("Received message from client:", message);
    
    try {
    const openaiResponse = await callOpenAi(message);
    console.log(openaiResponse);
    res.send(openaiResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));




