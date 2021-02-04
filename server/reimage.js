const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { WMStrm } = require('./wStream.js');

function getImage(vol = null) {
  return new Promise((resolve, reject) => {
    let outputPath = path.resolve(__dirname, '../imgbuilder/out.jpg');
    console.log('outputPath', outputPath);
    let data = vol[outputPath];
    // fs.readFile(imagePath, (err, data) => {
    //   if (err) reject(err);
    resolve(Buffer.from(data, 'base64'));
    // });
  });
}

function reImage(userInputs, vol = null) {
  let streamInImgPath = path.resolve(__dirname, '../imgbuilder/dash.jpg');
  // console.log('try', vol[streamInImgPath])
  console.log('vol image', fs.readFileSync(streamInImgPath));
  const streamIn = vol[streamInImgPath];
  // const streamIn = fs.createReadStream(streamInImgPath);

  const {
    notificationText = 'Notifications for Saturday123',
    siteUrl = 'OneSignalStyle.com',
    companyName = 'bandolierstyle.com',
  } = userInputs;
  const HEADER_TEXT = notificationText;
  const PUSH_NOTIF_HOST = companyName;
  const URL_TEXT = siteUrl;
  const args = ['-', '-resize', '640x', '-'];

  return new Promise((resolve, reject) => {
    const convert = spawn('convert', args, {
      cwd: process.cwd() + '/imgbuilder',
    });
    convert.stderr.on('data', (err) => {
      console.log('stderr', err);
    });
    convert.stdout.on('data', (data) => {
      console.log('spawn data', data);
    });
    streamIn.on('data', (data) => {
      console.log('data', data);
    });
    streamIn.pipe(convert.stdin);
    vol['./test.jpg'] = null;
    convert.stdout
      .pipe(WMStrm({ key: './test.jpg', destination: vol }))
      .on('finish', () => {
        console.log('downloadStream', vol['./test.jpg']);
        resolve(Buffer.from(vol['./test.jpg'], 'binary').toString('base64'));
      });
  });
  // return new Promise((resolve, reject) => {
  //   execFile(
  //     `sh gen_image.sh`,
  //     [`"${HEADER_TEXT}"`, `"${PUSH_NOTIF_HOST}"`, `"${URL_TEXT}"`],
  //     { cwd: process.cwd() + '/imgbuilder', shell: true },
  //     // { cwd: vol['fakeImgPath'], shell: true },
  //     (err, stdout, stderr) => {
  //       if (err) {
  //         reject({ error: err });
  //       }
  //       let imagePath = path.resolve(__dirname, '../imgbuilder/out.jpg');
  //       // console.log('vol', vol[imagePath]);
  //       fs.readFile(imagePath, (err, data) => {
  //         if (err) reject(err);
  //         resolve(Buffer.from(data, 'binary').toString('base64'));
  //       });
  //     }
  //   );
  // });
}

module.exports = {
  getImage,
  reImage,
};
