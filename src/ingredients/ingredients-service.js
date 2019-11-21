const IngredientService = {
  getAllIngredients(knex) {
    return knex.select("*").from("ingredients");
  },
  getByRecipeId(knex, recipe_id) {
    return knex
      .from("recipe_ingredients AS recIng")
      .select("recIng.amount", "ingredients.name")
      .where({ recipe_id })
      .leftJoin("ingredients as ings", "recIng.ingredient_id", "ings.id");
    // .select("ingredient_amount")
    // .from("recipe_ingredients")
    // .where({ recipe_id })
    // .innerJoin("ingredients");
    // knex("users").innerJoin("accounts", function() {
    //   this.on("accounts.id", "=", "users.account_id").orOn(
    //     "accounts.owner_id",
    //     "=",
    //     "users.id"
    //   );
    // });
    // join select ing_name from ingredients where id ing.ingredient_id
  }
};

module.exports = IngredientService;
