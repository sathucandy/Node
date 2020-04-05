const express = require("express");
const tourController = require("./../controllers/tourController");
const router = express.Router();

// // creating param wear
// router.param("id", tourController.checkId);

// create a checkbody middlewear function
// Check if body contains the name and price property
// If not send back 400 status code
// add it to post handler stack

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id/:x?")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
