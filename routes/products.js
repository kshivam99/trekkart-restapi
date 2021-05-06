const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Get all posts
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

//submit a new post
router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    old_price: req.body.old_price,
    new_price: req.body.new_price,
    rating: req.body.rating,
    total_rating: req.body.total_rating,
    category: req.body.category,
    featured: req.body.featured,
    brand: req.body.brand,
    stock: req.body.stock,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//specific get
router.get("/:postId", async (req, res) => {
  try {
    const products = await Product.findById(req.params.postId);
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a product rating
router.patch("/:postId/rating", async (req, res) => {
  try{
    const updatedProduct = await Product.updateOne(
      { _id: req.params.postId },
      { $set: { rating: req.body.rating, total_rating: req.body.total_rating } }
    );
    res.json(updatedProduct);
  }
  catch(err)
  {
    res.json({message: err});
  }
})

module.exports = router;
