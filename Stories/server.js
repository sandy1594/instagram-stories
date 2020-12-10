const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

PORT = process.env.PORT || 5000;

// EJS
app.set("view engine", "ejs");

// cookie-parser
app.use(cookieParser());

// Connect to Postgres

const db = require("./dbConfig");

let connectToPostgres = async () => {
  try {
    db.authenticate();
    console.log("Connected to Postgres");
  } catch (error) {
    console.log(error);
  }
};

connectToPostgres();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", require("./controllers/Posts"));
app.use("/", require("./controllers/Register"));
app.use("/", require("./controllers/Login"));
app.use("/", require("./controllers/HomePage"));

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
