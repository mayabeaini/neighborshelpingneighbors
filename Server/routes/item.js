const express = require("express");
const Item = require("../models/items")
const router = express.Router();

router
.route("/")
.get((req, res) => {
    Item.where(req.query)
    .fetchAll({ withRelated: ["orders"] })
    .then(items => {
        res.status(200).json({ items });
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

// POST ORDERS

router
   .route("/")
   .post((req, res) => {
       new Item({
           id: req.body.id,
           name: req.body.name,
           description: req.body.description,
           image: req.body.image,
           price: req.body.price,
           category: req.body.category
       })
       .save(null, {method: 'insert'})
       .then(newItem => {
           res.status(201).json({ newItem });
       })
       .catch(err =>{
           res.status(400).json({err})
       });
   });


// GET A SINGLE ORDER

router
   .route("/:id")
   .get((req, res) => {
       Item.where(req.params)
       .fetch({ withRelated: ["orders"] })
       .then(items => {
           res.status(200).json({ items });
       })
       .catch(err =>{
        res.status(400).json({err})
    });
   })

//    UPDATE A SINGLE ORDER

   router
   .route("/:id")
   .put((req, res) => {
 
       Item.where("id", req.params.id)
       .fetch()
       .then(items => {
           items
           .save({
               price: req.body.price ? req.body.price : items.price,
               image: req.body.image ? req.body.image : items.image,
               description: req.body.description ? req.body.description : items.description,
           })
           .then(updatedItems => {
               res.status(200).json({ updatedItems });
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
       Item.where("id", req.params.id)
       .destroy()
       .then(deletedItems => {
           res.status(200).json({ deletedItems });
       })
       .catch(err =>{
        res.status(400).json({err})
       });
   });
 

module.exports = router;