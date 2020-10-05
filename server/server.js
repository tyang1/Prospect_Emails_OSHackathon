const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
const reimage = require('./reimage.js');

// let imageArgs = {
//   DASHBOARD_IMAGE: 'dash.jpg',
//   SCREENSHOT_IMAGE: 'shot.jpg',
//   PUSH_NOTIF_IMAGE: 'icon.jpg',
//   OUTPUT_IMAGE: 'out.jpg',
//   BASE_IMAGE: 'base.jpg',
//   BROWSER_IMAGE: 'browser.jpg',
//   PUSH_IMAGE: 'push.jpg',
// };

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

app.post('/images', (req, res) => {
  //kicking off a child process here to build the image
  reimage()
    .then((result) => {
      if (result.success) {
        console.log('getting images!!!');
        const { outputLocationPath } = req.body;
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

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
