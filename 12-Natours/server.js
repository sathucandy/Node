const mongoose = require("mongoose");
const dotenv = require("dotenv"); // this is to read config.env file
dotenv.config({ path: "./config.env" }); // this is to read config.env file

const app = require("./app");
console.log(app.get("env"));

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

// creating the documents
// const testTour = new Tour({
//   name: "The Park Camper",
//   // rating: 4.7,
//   price: 997,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log(process.env);
// 4) creating a server in express
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
