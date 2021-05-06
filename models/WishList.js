const mongoose = require("mongoose");

const WishSchema = mongoose.Schema({
  user: String,
  wishList: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("wish", WishSchema);

