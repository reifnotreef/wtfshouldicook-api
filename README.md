# wtfshouldicook api

This is the Node/Express/Postgres back end for [wtfshouldicook](https://wtfshouldicook.com)

## Tech used
### Front-end
> Node

> React
### Back-end
> Express

> PostgresQL for database

> knex for querying database

## End Points

### base url: 
> https://wtfshouldicook-api.herokuapp.com/api

### Get a recipe:
> /recipe?cuisine=&complex=no

#### Current cuisine options:
 - American
 - British
 - Chinese
 - Indian
 - Italian
 - Mexican
 > can be left blank
 
 #### Complex options:
 - yes
 - no

This will query the database and return the :id of a recipe based on cuisine and complex options.

With that :id you can then get the recipe details(cook time etc), ingredients, and instructions:

```/recipe/:id```

> Returns the recipe details.

```/ingredient/:id```

> Returns the ingredients

```/instruction/:id```

> Rerturns the instructions
