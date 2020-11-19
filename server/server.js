const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
const reimage = require('./reimage.js');
const cors = require('cors');
const { vol } = require('memfs');

/**Multer adds a body object and a file or files object to the request object.
 * The body object contains the values of the text fields of the form, the file or files object
 * contains the files uploaded via the form.
 **/

const imagePaths = ['../imgbuilder/browser.jpg', '../imgbuilder/dash.jpg'];
const json = {};

let fileToMemfsFunc = (file) => {
  return new Promise((resolve, reject) => {
    let imagePath = path.resolve(__dirname, file);
    fs.readFile(imagePath, (err, data) => {
      if (err) reject(err);
      json[imagePath.toString()] = Buffer.from(data, 'binary').toString(
        'base64'
      );
      resolve(json);
    });
  });
};

let files = imagePaths.map(fileToMemfsFunc);

//TODO; 1. copying all default images to memfs filesystem
const createInMemFileSys = async (files) => {
  try {
    let promisedFiles = Promise.all(files);
    await promisedFiles.then((results) => {
      vol.fromJSON(json);
      // console.log(
      //   vol.readFileSync(
      //     '/Users/tiffanyyang/Desktop/OSHackathon/my_app/imgbuilder/browser.jpg'
      //   )
      // );
    });
  } catch (err) {
    throw new Error(err);
  }
};

//Creating in memory builder default images
createInMemFileSys(files);

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

var upload = multer({ storage }).fields([
  { name: 'website' },
  { name: 'icon' },
]);

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
