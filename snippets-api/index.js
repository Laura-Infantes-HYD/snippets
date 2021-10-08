require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env["MONGO_URI"]);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

//App config
app.use(cors()); //remove when same origin
app.use(express.json());

//Routes to collections
const snippetsRouter = require("./routes/snippets");
app.use("/snippets", snippetsRouter);

const tagsRouter = require("./routes/tags");
app.use("/tags", tagsRouter);

const languagesRouter = require("./routes/languages");
app.use("/languages", languagesRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(8000, () => console.log("server started"));
