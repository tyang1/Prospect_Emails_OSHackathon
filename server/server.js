const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
const { reImage, getImage } = require('./reimage.js');
const { createInMemFileSys } = require('./createFileToMem.js');
const cors = require('cors');
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
    ? process.env.DOTENV_CONFIG_HOST || 'localhost'
    : process.env.DOTENV_PROD_HOST;

//Creating in memory builder default images
// createInMemFileSys(files);

//TODO: remove the following after memfs is all set
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../imgbuilder'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg');
  },
});
var upload = multer({ storage }).fields([
  { name: 'website' },
  { name: 'icon' },
]);

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const uploadMW = (req, res, next) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     next();
//   });
// };

app.use(bodyParser.json());
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
  //kicking off a child process here to build the image
  createInMemFileSys().then((fileSys) => {
    reImage(req.body, fileSys)
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
  createInMemFileSys().then((files) => {
    getImage(files)
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
  console.log(`Listening on port ${port}`);
});

module.exports = app;
