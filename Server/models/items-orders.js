const bookshelf = require("../bookshelf");

const Item = require("./items");
 
const ItemOrder = bookshelf.model("ItemOrder", {
  tableName: "items_orders",
    orders: function() {
        return this.belongsTo("Order")
    },
    items: function() {
        return this.belongsTo(Item)
    }
});
 
module.exports = ItemOrder;