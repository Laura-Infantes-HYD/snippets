require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env["MONGO_URI"]);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(cors()); //remove when same origin

app.use(express.json());

const snippetsRouter = require("./routes/snippets");
app.use("/snippets", snippetsRouter);

app.listen(8000, () => console.log("server started"));
