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

// console.log(process.env);
// 4) creating a server in express
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
