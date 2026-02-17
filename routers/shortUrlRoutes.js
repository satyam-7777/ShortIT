const express = require("express");
const router = express.Router();
const shortenController = require("../controllers/shortenController");
const validationController = require("../controllers/validationController");

router
  .route("/shorten")
  .post(
    validationController.validateRequestBody,
    validationController.validateOriginalUrl,
    shortenController.isAlreadyShortened,
    shortenController.getAndShortUrl,
  );

router.route("/:code").get(shortenController.fetchAndRedirectUrl);

module.exports = router;
