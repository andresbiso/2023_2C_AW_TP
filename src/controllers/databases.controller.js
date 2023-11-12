const mongoose = require('mongoose');
const { formatResponse } = require('../utils/utils');

const getDatabases = async (req, res, next) => {
  try {
    const data = await mongoose.connection.db.admin().command({
      listDatabases: 1,
    });
    if (data && data.databases.length > 0) {
      res.status(200).send(formatResponse(data, null));
    } else {
      res.status(404).send(formatResponse(null, 'Data not found'));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getDatabases };
