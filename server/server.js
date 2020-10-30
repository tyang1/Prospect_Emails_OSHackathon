const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
const reimage = require('./reimage.js');

/**Multer adds a body object and a file or files object to the request object.
 * The body object contains the values of the text fields of the form, the file or files object
 * contains the files uploaded via the form.
 **/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../imgbuilder'));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '.jpg');
  },
});
var upload = multer({ storage: storage });

let PORT = 8080;

app.use(bodyParser.json());
app.use(cookieParser());
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

app.post('/images', upload.single('photo'), (req, res) => {
  //kicking off a child process here to build the image
  const { data } = req.body;
  reimage(data)
    .then((result) => {
      if (result.success) {
        let imagePath = path.resolve(__dirname, '../imgbuilder/out.jpg');
        fs.readFile(imagePath, (err, data) => {
          if (err) throw err;
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(Buffer.from(data, 'binary').toString('base64'));
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/upload', upload.single('photo'), (req, res) => {
  console.log('inside /upaload');
  if (req.file) {
    return;
  } else throw 'error';
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
