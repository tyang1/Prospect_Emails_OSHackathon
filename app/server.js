const express = require('express');

const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static(`${__dirname}/dist`));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});

app.listen(process.env.PORT || 3000);
