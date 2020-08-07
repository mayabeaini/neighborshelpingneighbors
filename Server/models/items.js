const bookshelf = require("../bookshelf");
 
  const Item = bookshelf.model("Item", {
    tableName: "items",
    orders: function() {
        return this.belongsToMany("Order")
    }
  }
);
 
module.exports = Item;