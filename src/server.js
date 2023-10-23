const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const argv = require('minimist')(process.argv.slice(2));
const cors = require('cors');
const mongoose = require('mongoose');

// Controllers
const usersCtrl = require('./controllers/users');
const databasesCtrl = require('./controllers/databases');

//CORS
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.options('*', cors());

const subpath = express();
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);
app.use('', subpath);

var domain = 'localhost';
if (argv.domain !== undefined) domain = argv.domain;
else
  console.log(
    'No --domain=xxx specified, taking default hostname "localhost".',
  );

var port = 3000;
if (argv.port !== undefined) port = argv.port;
else console.log('No --port=xxx specified, taking default port ' + port + '.');

// MongoDB Connection
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = 'mongodb://127.0.0.1:27017/my_db';
async function mongo_connection() {
  mongoose.set('strictQuery', true);
  try {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(function (db) {
        console.log('MongoDB Connection Done!!');
      })
      .catch(function (err) {
        console.log('MongoDB Database Connection Error', err);
      });
  } catch (e) {
    console.log(e);
  }

  const db = mongoose.connection;

  // Check DB Connection
  db.once('open', () => {
    (async () => {
      const data = await mongoose.connection.db.admin().command({
        listDatabases: 1,
      });
      console.log(data);
    })();
    console.log('Connected to MongoDB');
  });

  // Check for DB errors
  db.on('error', (err) => {
    console.log('DB Connection errors', err);
  });

  app.get('/', function (req, res) {
    res.status(200).send('¡Hola Mundo!');
  });
  app.use('/api/v1/users', usersCtrl);
  app.use('/api/v1/databases', databasesCtrl);

  app.listen(port, function () {
    console.log(`El servidor se encuentra escuchando en el puerto ${port}`);
    console.log(`Acceso al servidor en: http://${domain}:${port}/`);
  });
}

mongo_connection();
