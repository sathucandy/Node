const mongoose = require("mongoose");
const dotenv = require("dotenv"); // this is to read config.env file
const app = require("./app");
console.log(app.get("env"));

dotenv.config({ path: "./config.env" }); // this is to read config.env file

// connecting to mongoose
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true, // these parameters are for removing the warnings
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("DB connections successful");
  });

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

// console.log(process.env);
// 4) creating a server in express
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
