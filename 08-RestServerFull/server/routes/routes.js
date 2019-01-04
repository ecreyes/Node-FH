const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./categoria'));
app.use(require('./producto'));
app.use(require('./login'));

module.exports = app;