exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", table => {
      table.increments();
      table.string("title", 50).notNullable();
      table.string("genre", 30).notNullable();
      table.integer("releaseYear");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
