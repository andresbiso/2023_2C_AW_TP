const errorHandler = (error, req, res, next) => {
  if (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  next();
};

module.exports = errorHandler;
