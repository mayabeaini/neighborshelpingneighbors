const express = require("express");
const ItemOrder = require("../models/items-orders")
const router = express.Router();

router
.route("/")
.get((req, res) => {
    ItemOrder.where(req.query)
    .fetchAll({ withRelated: ["orders", "items"] })
    .then(itemsorders => {
        res.status(200).json({ itemsorders });
    })
    .catch(err =>{
        res.status(400).json({err})
    });
})

// POST ORDERS

router
   .route("/")
   .post((req, res) => {
       new ItemOrder({
           order_id: req.body.order_id,
           item_id:req.body.item_id
       })
       .save()
       .then(newItemOrder => {
           res.status(201).json({ newItemOrder });
       })
       .catch(err =>{
        res.status(400).json({err})
        });
   }); 

module.exports = router;