const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const axios = require('axios');

const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

// Middlewares

app.use(express.json());
app.use(cors());

// Routes

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
  });
};

server();

const url = `https://expense-tracker-backend-bfpg.onrender.com/api/v1`;

const interval = 30000;

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);