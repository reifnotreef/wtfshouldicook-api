const knex = require("knex");

const RecipeService = {
  getAllRecipes(db) {
    return db.select("*").from("recipes");
  },
  getById(db, id) {
    return db("recipes").where({ id });
  },

  // var withUserName = function(queryBuilder, foreignKey) {
  //   queryBuilder.leftJoin('users', foreignKey, 'users.id').select('users.user_name');
  // };
  // knex.table('articles').select('title', 'body').modify(withUserName, 'articles_user.id').then(function(article) {
  //   console.log(article.user_name);
  // });

  getByAnswers(db, answers) {
    console.log(`answers.cuisine: ${answers.cuisine}`);
    console.log(`answers.complex: ${answers.complex}`);
    console.log(`answers.craving: ${answers.craving}`);
    var condi = (queryBuilder, answers) => {
      if (answers.cuisine) {
        queryBuilder
          .where({ complex: answers.complex })
          .andWhere("cuisine", answers.cuisine);
      } else {
        queryBuilder.where({ complex: answers.complex });
      }
    };
    return db("recipes")
      .select("id")
      .modify(condi)
      .orderByRaw("RANDOM()")
      .limit(1)
      .then(response => response);
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
