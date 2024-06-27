const mongoose = require("mongoose");
const reviewsFreight = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  id_user_do_review: {
    type: String,
    required: true,
  },
  id_user_freight: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
    required: false,
  },
  stars: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("reviewsFreight", reviewsFreight);
