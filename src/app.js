require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const RecipeRouter = require("./recipe/recipe-router");
const IngredientRouter = require("./ingredients/ingredients-router");
const InstructionRouter = require("./instructions/instructions-router");
const app = express({ maxAge: "31557600" });

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.use("/api/recipe", RecipeRouter);
app.use("/api/ingredient", IngredientRouter);
app.use("/api/instruction", InstructionRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
