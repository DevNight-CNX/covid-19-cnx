const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

const APP_PORT = process.env.PORT || 3001;

const app = express();

app.use(helmet());

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}!`);
});
