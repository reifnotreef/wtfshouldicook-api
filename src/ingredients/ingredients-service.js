const IngredientService = {
  getAllIngredients(knex) {
    return knex.select("*").from("ingredients");
  },
  getByRecipeId(knex, recipe_id) {
    return knex
      .select("ingredient_amount")
      .from("recipe_ingredients")
      .where({ recipe_id })
      .rightJoin(
        "ingredients",
        "ingredient.id",
        "=",
        "recipe_ingredient.ingredient_id"
      );
    // join select ing_name from ingredients where id ing.ingredient_id
  }
};

module.exports = IngredientService;
