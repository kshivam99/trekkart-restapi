const express = require("express");
const router = express.Router();
const WishList = require("../models/WishList");
const verify = require("./verifyToken");

//Get user's wishList
router.get("/", verify, async (req, res) => {
  try {
    const wish = await WishList.findOne({ user: req.user._id });
    res.json(wish);
  } catch (err) {
    res.json({ message: err });
  }
});


//add new user's wishList
router.post("/", verify, async (req, res) => {
  try {
    const savedWish = await WishList.findOneAndUpdate(
      { user: req.user._id },
      { wishList: req.body.wishList },
      null,
      async function (err, result) {
        if (!result) {
          const wish = new WishList({
            user: req.user._id,
            wishList: req.body.wishList,
          });
          try {
            const savedWish = await wish.save();
            res.json(savedWish);
          } catch (err) {
            res.status(400).json({ message: err });
          }
        }
      }
    );
    res.send(savedWish);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
