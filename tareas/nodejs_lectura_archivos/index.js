const express = require('express');
const fs = require('fs');

var app = express();
app.get('/', function (req, res) {
  res.status(200).send('¡Hola Mundo!');
});
app.get('/lorem-ipsum', function (req, res) {
  const filename = './test.txt';
  fs.readFile(filename, 'utf-8', (err, data) => {
    if (err) {
      console.log('Error: ' + filename);
      res.status(500).send(err);
    }
    console.log('OK: ' + filename);
    console.log(data);
    res.contentType('text/plain').send(data);
  });
});
app.listen(10000, function () {
  const port = 10000;
  console.log(
    'Started application on port %d: http://localhost:%d',
    port,
    port,
  );
});
