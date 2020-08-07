const bookshelf = require("../bookshelf");
const Item = require("./items");
 
   const Orders = bookshelf.model("Order", {
       tableName: "orders",
       users: function() {
           return this.belongsTo("User");
       },
       delivery_user: function() {
           return this.belongsTo("User", "delivery_id", "id");
       },
       items: function() {
           return this.belongsToMany(Item);
       }
   });
 
   module.exports = Orders;