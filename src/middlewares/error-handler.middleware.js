const { formatResponse } = require('../utils/utils');

const errorHandler = (error, req, res, next) => {
  if (error) {
    console.log(error);
    res.status(500).send(formatResponse(null, error.message));
  }
  next();
};

module.exports = errorHandler;
