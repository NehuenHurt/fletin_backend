const mongoose = require("mongoose");
const freightSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
  id_user: {
    type: String,
    required: false,
  },
  phone_num_prefix: {
    type: Number,
    required: true,
  },
  phone_num: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  available_days_from: {
    type: String,
    required: true,
  },
  available_days_to: {
    type: String,
    required: true,
  },
  available_hour_from: {
    type: String,
    required: true,
  },
  available_hour_to: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});
freightSchema.index({city: 'text'});
module.exports = mongoose.model("Freight", freightSchema);
