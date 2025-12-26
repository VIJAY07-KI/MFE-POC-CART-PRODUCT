const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// load db.json
const data = require("./src/db.json");

// test route
app.get("/", (req, res) => {
  res.send("Products API is running 🚀");
});

// products route
app.get("/products", (req, res) => {
  res.json(data.products);
});

// start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
