
const orderData = require("../seed_data/orders");
const userData = require("../seed_data/users");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(userData);
    })
    .then(() => {
      return knex("orders").del();
    })
    .then(() => {
      // Inserts seed entries
      return knex("users")
        .pluck("id")
        .then(userIds => {
          return userIds;
        });
    })
    .then(userIds => {
      const orderDataWithUserIds = orderData.map(order => {
        order.user_id =
          userIds[Math.floor(Math.random() * userIds.length)];
        return order;
      });
      return knex("orders").insert(orderDataWithUserIds);
    })
};
