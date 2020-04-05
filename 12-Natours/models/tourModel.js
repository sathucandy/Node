const mongoose = require("mongoose");
// creating a schema using mongoose
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

// creating a model out of schema
const Tour = mongoose.model("Tour", tourSchema); // first param is name of the model and second param is name of the schema

module.exports = Tour;
