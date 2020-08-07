
exports.up = knex => {
    return knex.schema.createTable("orders", table => {
      table.increments("id").primary();
      table.string("address").notNullable();
      table
        .decimal("totalprice")
        .notNullable()
        .defaultTo(0);
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("delivery_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .decimal("lng", 14,10)
        .notNullable()
        .defaultTo(0);
      table
        .decimal("lat", 14, 10)
        .notNullable()
        .defaultTo(0);
      table.string("status").notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };

  exports.down = knex => {
    return knex.schema.dropTable("orders");
  };
  