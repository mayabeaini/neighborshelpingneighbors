const express = require("express");
const User = require("../models/users");

const router = express.Router();

// WAREHOUSE === USERS
// GET ALL USERS

router
   .route("/")
   .get((req, res) => {
       User.where(req.query)
       .fetchAll({ withRelated: ["orders", "deliveries"] })
       .then(users => {
           res.status(200).json(users);
       })
       .catch(err =>{
        res.status(400).json({err})
        });
   })

// POST A USER

router
   .route("/")
   .post((req, res) => {
       new User({
       name: req.body.name,
       google_id:req.body.google_id
       })
       .save()
       .then(newUser => {
           res.status(201).json({ newUser });
       })
       .catch(err =>{
        res.status(400).json({err})
        });
   });


//    GET A SINGLE USER

router
   .route("/:id")
   .get((req, res) => {
       User.where(req.params)
       .fetch({ withRelated: ["orders", "deliveries"] })
       .then(user => {
           res.status(200).json(user);
       })
       .catch(err =>{
        res.status(400).json({err})
        });
   })

//    UPDATE A SINGLE USER

router
.route("/:id")
.put((req, res) => {
    User.where("id", req.params.id)
    .fetch()
    .then(user => {
        user
        .save({
          name: req.body.name ? req.body.name : users.name,
        })
        .then(updatedUser => {
            res.status(200).json({ updatedUser });
        })
        .catch(err =>{
            res.status(400).json({err})
        }); 
    });
})

// DELETE A SINGLE USER

router
   .route("/:id")
   .delete((req, res) => {
       User.where("id", req.params.id)
       .destroy()
       .then(deletedUser => {
           res.status(200).json({ deletedUser });
       })
       .catch(err =>{
        res.status(400).json({err})
        });
   });
 
module.exports = router;