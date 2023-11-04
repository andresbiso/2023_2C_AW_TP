const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../configs/swagger.json');

// Routes
const usersRoute = require('../routes/users.route');
const databasesRoute = require('../routes/databases.route');

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

// Register Routes
app.use(usersRoute);
app.use(databasesRoute);

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
  return res.status(400).json({ message: 'Bad Request' });
});

module.exports = app;
