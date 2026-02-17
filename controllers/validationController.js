const validator = require("validator");
const AppError = require("../utils/appErrorHandler");

exports.validateRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("Request body is empty", 400));
  }
  next();
};

exports.validateOriginalUrl = (req, res, next) => {
  const { url } = req.body;
  if (!url) {
    return next(new AppError("Please provide the url", 400));
  }

  const isValid = validator.isURL(url, {
    require_protocol: true,
    require_tld: false,
    protocols: ["http", "https"],
  });

  if (!isValid) {
    return next(new AppError("Invalid URL format", 400));
  }
  next();
};

exports.invalidPathHandler = (req, res, next) => {
  next(new AppError("This route is not present in the server", 404));
};
