const express = require("express");

// adding bunch of methods of express to app variable
const app = express();

// creating a server in express
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

// defining route
app.get("/", (req, res) => {
  //   res.status(200).send("Hello from the server side");
  res
    .status(200)
    .json({ message: "Hello from the server side", app: "Natours" });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint");
});
