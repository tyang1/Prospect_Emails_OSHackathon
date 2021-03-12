const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const formidableMiddleware = require('express-formidable');

const start = (options) => {
  return new Promise((resolve, reject) => {
    const { port, hostname, createInMemFileSys, getImage } = options;
    if (!port) {
      reject(new Error('no port config'));
    }
    if (!hostname) {
      reject(new Error('no hostname config'));
    }

    if (!createInMemFileSys) {
      reject(new Error('no createInMemFileSys config'));
    }

    if (!getImage) {
      reject(new Error('no getImage config'));
    }
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
     * POST /images/preview route
     *
     */
    app.post('/images/preview', (req, res) => {
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
     * POST /images/download route
     *
     */
    app.post('/images/download', (req, res) => {
      let imagePayload = { ...req.fields, ...req.files };
      createInMemFileSys().then((files) => {
        getImage(imagePayload, files)
          .then((img) => {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(img);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });

    const server = app.listen(port, hostname, () => {
      console.log(`Listening on port ${port}, with hostname ${hostname}`);
      resolve(server);
    });
  });
};

module.exports = Object.assign({}, { start });
