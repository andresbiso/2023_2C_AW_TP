const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const argv = require('minimist')(process.argv.slice(2));
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Controllers
const usersCtrl = require('./controllers/users.controller');
const databasesCtrl = require('./controllers/databases.controller');

require('dotenv').config();

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

let hostname = process.env.HOST;
if (argv.hostname !== undefined) {
  hostname = argv.hostname;
} else {
  console.log(
    `No --hostname=xxx specified, taking default hostname "${hostname}".`,
  );
}
let port = process.env.PORT;
if (argv.port !== undefined) {
  port = argv.port;
} else {
  console.log('No --port=xxx specified, taking default port ' + port + '.');
}

// MongoDB Connection
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = process.env.MONGODB_URI;
async function mongo_connection() {
  mongoose.set('strictQuery', true);
  try {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(function () {
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
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(port, function () {
    console.log(`El servidor se encuentra escuchando en el puerto ${port}`);
    console.log(`Acceso al servidor en: http://${hostname}:${port}/`);
  });
}

mongo_connection();
