const config = require('../config.json');
const App = require('./App');
const app = new App(config);

const server = app.server;

server.listen(config.webServerPort || 3000, config.webServerHost);
