const Tour = require("./../models/tourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "missing name or price",
    });
  }
};

// to make these functions available to other modules we will replace const with export

exports.getAllTours = (req, res) => {
  // calling the middlewear
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  // here we are converting id to integer as it returns string
  // when we multiply a string by number it converts string to number
  const id = req.params.id * 1;
  // // const tour = tours.find((el) => {
  // //   return el.id === id;
  // // });
  // // res.status(200).json({
  // //   status: "success",
  // //   data: {
  // //     tour,
  // //   },
  // });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      // tour: newTour,
    },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated Tour here",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
