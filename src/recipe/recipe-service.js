const RecipeService = {
  getAllRecipes(db) {
    return db.select("*").from("recipes");
  },
  getById(db, id) {
    return db("recipes").where({ id });
  },

  getByAnswers(db, answers) {
    console.log(`answers.cuisine: ${answers.cuisine}`);
    console.log(`answers.complex: ${answers.complex}`);
    let comSym = answers.complex === "no" ? "False" : "True";
    console.log(comSym);
    return db("recipes")
      .count("id as CNT")
      .where({ complex: comSym })
      .andWhere("cuisine", "=", answers.cuisine)
      .then(response => {
        let count = Object.values(response[0]);
        let rand = Math.floor(Math.random() * Math.floor(count));
        return rand;
      })
      .then(rand => rand);
  },
  postRecipe(db, recipe) {
    return db("recipes")
      .insert({
        name: recipe.name,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        cuisine: recipe.cuisine,
        complex: recipe.complex
      })
      .returning("id");
  },
  postRecipeInstructions(db, ins, id) {
    return Promise.all(
      ins.map((item, i) => {
        return db("instructions")
          .insert({
            recipe_id: parseInt(id, 10),
            step_number: parseInt(i, 10),
            instructions: item.instructions
          })
          .returning("recipe_id");
      })
    ).then(response => response);
  },
  postIngredients(db, ing) {
    return Promise.all(
      ing.map(item => {
        return db("ingredients")
          .insert({
            name: item.name
          })
          .returning("id");
      })
    ).then(response => response);
  },
  postRecipeIngredients(db, body, id, ing_id) {
    return Promise.all(
      body.ingredients.map((ing, i) => {
        return db("recipe_ingredients").insert({
          recipe_id: parseInt(id[i], 10),
          ingredient_id: parseInt(ing_id[i], 10),
          ingredient_amount: ing.amount
        });
      })
    );
  }
};

module.exports = RecipeService;
