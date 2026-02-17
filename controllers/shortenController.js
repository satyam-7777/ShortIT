const validator = require("validator");
const _ = require("lodash");
const { nanoid } = require("nanoid");
const shortUrlModel = require("../models/shortUrlModel");
const AppError = require("../utils/appErrorHandler");
const responseHandler = require("../utils/responseHandler");

exports.isAlreadyShortened = async (req, res, next) => {
  try {
    const { url } = req.body;
    const shortenData = await shortUrlModel.findOne(
      { originalUrl: url },
      { code: 1 },
    );
    console.log(shortenData);
    if (shortenData) {
      const responseData = {
        shortUrl: `${req.protocol}://${req.get("host")}/${shortenData.code}`,
      };
      return responseHandler.sendSuccessResponseHandler(res, 200, responseData);
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.getAndShortUrl = async (req, res, next) => {
  try {
    console.log("in getAndShortUrl");
    const { url: originalUrl } = req.body;
    const code = nanoid(Number(process.env.ID_LENGTH));

    const dbObject = {
      originalUrl,
      code,
    };

    await shortUrlModel.create(dbObject);

    const responseData = {
      shortUrl: `${req.protocol}://${req.get("host")}/${code}`,
    };

    responseHandler.sendSuccessResponseHandler(res, 201, responseData);
  } catch (err) {
    next(err);
  }
};

exports.fetchAndRedirectUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const urlData = await shortUrlModel.findOneAndUpdate(
      { code },
      { $inc: { clicks: 1 }, $set: { lastClickedAt: Date.now() } },
      { new: true },
    );
    if (urlData) {
      const originalUrl = _.get(urlData, "originalUrl", "");
      res.redirect(originalUrl);
    } else {
      throw new AppError("provided shortend url is invalid", 400);
    }
  } catch (err) {
    throw new AppError(err.message, 400);
  }
};
