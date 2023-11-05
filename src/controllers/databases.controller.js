const mongoose = require('mongoose');
const { formatResponse } = require('../utils/utils');

const getDatabases = async (req, res) => {
  try {
    const data = await mongoose.connection.db.admin().command({
      listDatabases: 1,
    });
    if (data && data.databases.length > 0) {
      res.status(200).send(formatResponse(data, null));
    } else {
      res.status(404).send(formatResponse(null, 'Data not found'));
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(formatResponse(null, e.message));
  }
};

module.exports = { getDatabases };
