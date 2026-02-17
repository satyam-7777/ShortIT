exports.globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: "failed",
    error: err.message,
  });
};

exports.sendSuccessResponseHandler = (
  res,
  statusCode,
  data,
  message,
  status = "success",
) => {
  res.status(statusCode).json({
    status,
    data,
    message,
  });
};
