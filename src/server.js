const argv = require('minimist')(process.argv.slice(2));
const app = require('./modules/app.module');
const Database = require('./models/database.model');
require('dotenv').config({ path: __dirname + '/configs/.env' });

// Connect to production database
const uri = process.env.MONGODB_URI;
const db = new Database(uri);
db.connect(uri);

// Get hostname and port
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

// Start listening
app.listen(port, hostname, () => {
  console.log(`El servidor se encuentra escuchando en el puerto ${port}`);
  console.log(`Acceso al servidor en: http://${hostname}:${port}/`);
});
