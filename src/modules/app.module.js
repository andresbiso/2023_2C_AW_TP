const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../configs/swagger.json');
const { formatResponse } = require('../utils/utils');

// Routes
const usersRoutes = require('../routes/users.routes');
const blogsRoutes = require('../routes/blogs.routes');
const articlesRoutes = require('../routes/articles.routes');
const commentsRoutes = require('../routes/comments.routes');
const databasesRoutes = require('../routes/databases.routes');

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
// All resources can get an options request
/*
Internally the cors() function does something similar to this:
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});
*/
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
app.use(usersRoutes);
app.use(blogsRoutes);
app.use(articlesRoutes);
app.use(commentsRoutes);
app.use(databasesRoutes);

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
  if (!res.headersSent) {
    return res.status(400).json(formatResponse(null, 'Bad Request'));
  }
});

module.exports = app;
