const express = require("express");

const server = express();

server.get("/", (request, response) => {
    response.send("hello");
  });

module.exports = server;