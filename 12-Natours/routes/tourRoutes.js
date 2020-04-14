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
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);

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
