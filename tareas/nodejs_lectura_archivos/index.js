const express = require('express');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

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
app.listen(port, () => {
  console.log(`El servidor se encuentra escuchando en el puerto ${port}`);
  console.log(`Acceso al servidor en: http://localhost:${port}/`);
});
