
exports.up = knex => {
  return knex.schema.createTable("items_orders", table => {
    table.increments("id").primary();
    table.integer("item_id").unsigned().references("items.id");
    table.integer("order_id").unsigned().references("orders.id");
  });
};

exports.down = knex => {
  return knex.schema.dropTable("items_orders");
};