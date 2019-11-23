const express = require("express");
const xss = require("xss");
const RecipeService = require("./recipe-service");

const recipeRouter = express.Router();
const jsonParser = express.json();

const serializeRecipe = recipe => ({
  name: xss(recipe.name),
  prep_time: xss(recipe.prep_time),
  cook_time: xss(recipe.cook_time),
  // picture_url: xss(recipe.picture_url),
  cuisine: xss(recipe.cuisine),
  complexity: xss(recipe.complexity)
});

recipeRouter
  .route("/")
  .get((req, res, next) => {
    res.status(200).send("testing /api/recipe GET");
  })
  .post((req, res, next) => {
    // console.log(req.body);
    const db = req.app.get("db");
    RecipeService.postRecipe(db, req.body);
    res
      .status(201)
      .location("/")
      .json(serializeRecipe(req.body));
  });

recipeRouter.route("/:id").get((req, res, next) => {
  const db = req.app.get("db");
  RecipeService.getById(db, req.params.id)
    .then(recipe => {
      res.json(recipe);
    })
    .catch(next);
});

module.exports = recipeRouter;
