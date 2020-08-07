const bookshelf = require("../bookshelf");
 
   const Users = bookshelf.model("User", {
       tableName: "users",
       orders: function() {
           return this.hasMany("Order");
       },
       deliveries: function() {
           return this.hasMany("Order", "delivery_id", "id")
       }
   });
 
   module.exports = Users;