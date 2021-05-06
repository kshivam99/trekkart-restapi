const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  name: String,
  description:[],
  images:[],
  old_price: Number,
  new_price: Number,
  rating: Number,
  total_rating: Number,
  category: String,
  featured: Boolean,
  brand: String,
  stock: Boolean,
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('product', PostSchema);
