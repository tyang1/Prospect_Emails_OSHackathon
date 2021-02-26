const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const { getImage } = require('./getImage.js');
const { createInMemFileSys } = require('./createFileToMem.js');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
// require('dotenv').config();

/**Multer adds a body object and a file or files object to the request object.
 * The body object contains the values of the text fields of the form, the file or files object
 * contains the files uploaded via the form.
 **/
let port =
  process.env.NODE_ENV === 'development'
    ? process.env.DOTENV_CONFIG_PORT || 8080
    : process.env.DOTENV_PROD_PORT;
let hostname =
  process.env.NODE_ENV === 'development'
    ? process.env.DOTENV_CONFIG_HOST || '0.0.0.0'
    : process.env.DOTENV_PROD_HOST;

app.use(bodyParser.json());
app.use(formidableMiddleware());
app.use(cookieParser());
app.use(cors());
app.use('/', express.static('dist'));

/**
 * root
 */
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

/**
 * POST /images route
 *
 */
//updates: remove the upload since everythin happens in-memory
app.post('/images', (req, res) => {
  let imagePayload = { ...req.fields, ...req.files };
  //kicking off a child process here to build the image
  createInMemFileSys().then((fileSys) => {
    getImage(imagePayload, fileSys)
      .then((img) => {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(img);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

/**
 * GET /images route
 *
 */
app.get('/images', (req, res) => {
  //TODO: using the saved form state
  createInMemFileSys().then((files) => {
    getImage(imagePayload, files, true)
      .then((img) => {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(img);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}, with hostname ${hostname}`);
});

module.exports = app;
