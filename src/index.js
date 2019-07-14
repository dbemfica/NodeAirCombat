const env = require('dotenv').config().parsed;
const app = require('./App');

app.listen(process.env.WEB_SERVER_PORT || 3000);