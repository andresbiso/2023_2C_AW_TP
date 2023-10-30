const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const data = await mongoose.connection.db.admin().command({
      listDatabases: 1,
    });
    if (data && data !== null) {
      res.status(200).send({ data: data });
      return;
    }
    res.status(200).send({ data: null, message: 'Data not found' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = router;
