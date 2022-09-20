const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const formidableMiddleware = require('express-formidable');

const start = (options) => {
  return new Promise((resolve, reject) => {
    const { port, hostname, repos } = options;
    if (!port) {
      reject(new Error('no port config'));
    }
    if (!hostname) {
      reject(new Error('no hostname config'));
    }

    if (repos.type !== 'imageInterface') {
      reject(new Error('no valid repos provided'));
    }

    app.use(bodyParser.json());
    app.use(formidableMiddleware());
    app.use(cookieParser());
    app.use(cors());

    const { createImage, getImage } = repos;

    /**
     * POST /images/preview route
     *
     */
    app.post('/images/preview', (req, res) => {
      let imagePayload = { ...req.fields, ...req.files };
      //kicking off a child process here to build the image
      createImage().then((fileSys) => {
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
      createImage().then((files) => {
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
