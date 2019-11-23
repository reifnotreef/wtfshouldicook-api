const RecipeService = {
  getAllRecipes(db) {
    return db.select("*").from("recipes");
  },
  getById(db, id) {
    return db("recipes").where({ id });
  },
  postRecipe(db, recipe) {
    return db
      .insert({
        name: recipe.name,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        cuisine: recipe.cuisine,
        complexity: recipe.complexity
      })
      .returning("id")
      .into("recipes")
      .then(console.log(id));
    // .then(
    //   (rIns = recipe.instructions
    //     .forEach((item, i) => {
    //       return { recipe_id: id, step_number: i, instructions: item.step };
    //     })
    //     .then(db("instructions").insert({ rIns })))
    // );
  }
};

module.exports = RecipeService;
