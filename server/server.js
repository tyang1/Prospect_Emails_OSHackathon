const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
const reimage = require('./reimage.js');
var cors = require('cors');

/**Multer adds a body object and a file or files object to the request object.
 * The body object contains the values of the text fields of the form, the file or files object
 * contains the files uploaded via the form.
 **/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../imgbuilder'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg');
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

var upload = multer({ storage }).single('photo');

const uploadMW = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
};

let PORT = 8080;

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

app.post('/images', upload, (req, res) => {
  //kicking off a child process here to build the image
  // if (req.file) {
  //   console.log('image uploaded', req.file);
  // }
  console.log('req.fields', req.body);
  reimage(req.body)
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

// app.post('/upload', upload, (req, res) => {
//   console.log('inside /upaload');
//   if (req.file) {
//     return;
//   } else throw 'error';
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
