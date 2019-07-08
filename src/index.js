const env = require('dotenv').config().parsed;
const app = require('./App');

app.listen(process.env.PORT || 3000);