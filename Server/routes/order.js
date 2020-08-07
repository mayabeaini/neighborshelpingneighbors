const express = require("express");
const Order = require("../models/orders");
const User = require("../models/users");
const router = express.Router();

// USERS === WAREHOUSE && ORDERS === INVENTORY
// GET ALL ORDERS

router
.route("/")
.get((req, res) => {
    Order.where(req.query)
    .fetchAll({ withRelated: ["users", "delivery_user", "items"] })
    .then(orders => {
        res.status(200).json({ orders });
    })
    .catch(err =>{
        res.status(400).json({err})
    });
})

// POST ORDERS

router
   .route("/")
   .post((req, res) => {
       User.where("id", req.body.user_id)
       .fetch()
       .then(users => console.log("User found"))
       .catch(users => {
           res.status(404).json({ error: "Please provide valid users/owner id" });
       });
       new Order({
       user_id: req.body.user_id,
       lng: req.body.lng,
       lat: req.body.lat,
       status: req.body.status,
       address: req.body.address,
       totalprice: req.body.totalprice,
       })
       .save()
       .then(newOrder => {
           res.status(201).json({ newOrder });
       })
       .catch(err =>{
        res.status(400).json({err})
    });
   });


// GET A SINGLE ORDER

router
   .route("/:id")
   .get((req, res) => {
       Order.where(req.params)
       .fetch({ withRelated: ["users", "items"] })
       .then(orders => {
           res.status(200).json({ orders });
       })
       .catch(err =>{
        res.status(400).json({err})
        });
   })

//    UPDATE A SINGLE ORDER

   router
   .route("/:id")
   .put((req, res) => { 
       Order.where("id", req.params.id)
       .fetch()
       .then(orders => {
           orders
           .save({
               address: req.body.address ? req.body.address : orders.address,
               totalprice: req.body.totalprice ? req.body.totalprice : orders.totalprice,
               user_id: req.body.user_id ? req.body.user_id : orders.user_id,
               status: req.body.status ? req.body.status : orders.status,
               lng: req.body.long ? req.body.lng : orders.lng,
               lat: req.body.lat ? req.body.lat : orders.lat,
               delivery_id: req.body.delivery_id ? req.body.delivery_id : orders.delivery_id,
           })
           .then(updatedOrders => {
               res.status(200).json({ updatedOrders });
           })
           .catch(err =>{
            res.status(400).json({err})
            }); 
       });
   })


//    DELETE AN ORDER
   router
   .route("/:id")
   .delete((req, res) => {
       Order.where("id", req.params.id)
       .destroy()
       .then(deletedOrders => {
           res.status(200).json({ deletedOrders });
       })
       .catch(err =>{
        res.status(400).json({err})
        });
   });
 
   module.exports = router;