const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // this is to read config.env file
const Tour = require("./../../models/tourModel");

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
    console.log("DB connections successful");
  });

// READ json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// IMPORT DATA TO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfuly loaded");
  } catch (err) {
    console.log(err);
  }
};

// DELETE all data from COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfuly deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
