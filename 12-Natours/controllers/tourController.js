const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// to make these functions available to other modules we will replace const with export

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
