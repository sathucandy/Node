const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

// adding bunch of methods of express to app variable
const app = express();

// 1) MIDDLE WEARS

app.use(morgan("dev"));

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// implementing middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middle wear");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// reading the json file data for getting tours
// JSON.parse converts the jason data into javascript
// object or an array of javascript object

//2) ROUTE HANDLERS

// 3) ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 4) creating a server in express
module.exports = app;

// defining route
// app.get("/", (req, res) => {
//   //   res.status(200).send("Hello from the server side");
//   res
//     .status(200)
//     .json({ message: "Hello from the server side", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint");
// });
