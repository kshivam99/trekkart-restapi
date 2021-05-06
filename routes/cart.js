const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verify = require("./verifyToken");

//Get user's cart
router.get("/", verify, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    res.json(cart);
  } catch (err) {
    res.json({ message: err });
  }
});


//add new user's cart
router.post("/", verify, async (req, res) => {
  try {
    const savedCart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { cart: req.body.cart },
      null,
      async function (err, result) {
        if (!result) {
          const cart = new Cart({
            user: req.user._id,
            cart: req.body.cart,
          });
          try {
            const savedCart = await cart.save();
            res.json(savedCart);
          } catch (err) {
            res.status(400).json({ message: err });
          }
        }
      }
    );
    res.send(savedCart);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
