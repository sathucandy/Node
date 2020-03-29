const fs = require("fs");
const express = require("express");

// adding bunch of methods of express to app variable
const app = express();

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
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  // calling the middlewear
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  // here we are converting id to integer as it returns string
  // when we multiply a string by number it converts string to number
  const id = req.params.id * 1;
  const tour = tours.find(el => {
    return el.id === id;
  });
  // if (id > tours.length)
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  // here object.assign merge the two properties of the object
  const newTour = Object.assign({ id: newId }, req.body);
  // adding the new tour to the last of the array
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour
        }
      });
    }
  );
  // res.send("done");
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Not found"
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated Tour here"
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Not found"
    });
  }
  res.status(204).json({
    status: "success",
    data: null
  });
};

// getting all tours
// {
// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// }
// sending tours on basis of id
// here "?" is for optional param
// {
//   app.get("/api/v1/tours/:id/:x?", getTour);
//   app.patch("/api/v1/tours/:id", updateTour);
//   // deleting a tour
//   app.delete("/api/v1/tours/:id", deleteTour);
// }
app
  .route("/api/v1/tours")
  .get(getAllTours)
  .post(createTour);

app
  .route("/api/v1/tours/:id/:x?")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// creating a server in express
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

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
