
exports.up = knex => {
  return knex.schema.createTable("items", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("image").notNullable();
    table.string("description").notNullable();
    table.decimal("price", 14, 5).notNullable();
    table.string("category").notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable("items");
};
