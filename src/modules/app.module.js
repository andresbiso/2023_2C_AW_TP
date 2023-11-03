const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../configs/swagger.json');

// Controllers
const usersCtrl = require('../controllers/users.controller');
const databasesCtrl = require('../controllers/databases.controller');

const errorHandlerMiddleware = require('../middlewares/error-handler.middleware');

// Creates an Express application
const app = express();

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.options('*', cors());

// BodyParser Configuration
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
// app.use('', subpath);

// Register Controllers
app.use(usersCtrl);
app.use(databasesCtrl);

// Register Custom Middlewares
app.use(errorHandlerMiddleware);

// Register Vendor Middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// The home / index route
app.get('/', function (req, res) {
  res.redirect(301, '/api-docs');
});

// Catch-all route
app.get('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
