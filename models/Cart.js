const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  user: String,
  cart: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cart", CartSchema);
