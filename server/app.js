const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const APP_PORT = process.env.APP_PORT || 9999;
const HEALTH_APP_PORT = process.env.HEALTH_APP_PORT || 9999;

const app = express();

const healthApp = express();

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

app.use(helmet());

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

healthApp.get('/health', (_, res) => {
  res.send('healthy\n');
});

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}!`);
});

healthApp.listen(HEALTH_APP_PORT, () => {
  console.log(`Health App listening on port ${HEALTH_APP_PORT}!`);
});
