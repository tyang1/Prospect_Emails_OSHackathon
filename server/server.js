const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { exec } = require('child_process');
const app = express();

const imgRootPath = '../imgbuilder/';
// let imageSettings = {
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
  // if (
  //   process.cwd() !== '/Users/tiffanyyang/Desktop/OSHackathon/my_app/imgbuilder'
  // ) {
  //   process.chdir('./imgbuilder');
  // }
  const testscript = exec(
    `sh ./imgbuilder/gen_image.sh dash.jpg SCREENSHOT_IMAGE PUSH_NOTIF_IMAGE OUTPUT_IMAGE BASE_IMAGE BROWSER_IMAGE PUSH_IMAGE`,
    // { cwd: './imgbuilder' },
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }

      console.log(` images data: ${stdout}`);
    }
  );
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
