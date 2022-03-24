// Use the dotenv package, to create environment variables
require("dotenv").config();
// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const { PORT = 3000 } = process.env;
// Import express, and create a server
const express = require("express");
const server = express();
// Require morgan and body-parser middleware
const morgan = require("morgan");
// Have the server use morgan with setting 'dev'
server.use(morgan("dev"));
// Import cors
// Have the server use cors()
const cors = require("cors");
server.use(cors());
// Have the server use bodyParser.json()
server.use(express.json());
// Have the server use your api router with prefix '/api'
const apiRouter = require("./api");
server.use("/api", apiRouter);
// Import the client from your db/index.js
const { client } = require("./db/index");
// Create custom 404 handler that sets the status code to 404.
server.use("*", (req, res, next) => {
  res.status(404);
  next();
  res.send({ error: "Not found" });
});
// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.use((error, req, res, next) => {
  res.status(500);
  res.send({ error: error.message });
});

// Start the server listening on port PORT
// On success, connect to the database
server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
client.connect();
