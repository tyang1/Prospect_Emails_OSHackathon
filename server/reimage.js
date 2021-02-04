const { spawn, execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const { WMStrm } = require('./wStream.js');
const { Children } = require('react');

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
  let pushStreamInImgPath = path.resolve(__dirname, '../imgbuilder/push.jpg');
  const streamIn = vol[streamInImgPath];
  const pushStreamIn = vol[pushStreamInImgPath];

  const {
    notificationText = 'Notifications for Saturday123',
    siteUrl = 'OneSignalStyle.com',
    companyName = 'bandolierstyle.com',
  } = userInputs;
  const HEADER_TEXT = notificationText;
  const PUSH_NOTIF_HOST = companyName;
  const URL_TEXT = siteUrl;
  // const args = [];
  const magicCommands = [
    // '-',
    'fd:3',
    '-size',
    '1024x768',
    // 'canvas:',
    // 'fd:3',
    // '-geometry',
    // '764x764+0+50',
    // '-composite',
    '-',
    // '+append',
    // 'out.jpg',
  ];
  const spawnOptions = {
    stdio: [
      'pipe',
      'pipe',
      'pipe',
      'pipe', // arrowBuffer1
      'pipe', // arrowBuffer2
      // 'ipc',
    ],
  };

  return new Promise((resolve, reject) => {
    const convert = spawn('convert', magicCommands, spawnOptions);
    convert.stderr.on('data', (err) => {
      console.log('stderr', err);
    });
    convert.stdout.on('data', (data) => {
      console.log('spawn data', data);
    });
    streamIn.on('data', (data) => {
      console.log('data', data);
    });
    // streamIn.pipe(convert.stdin);

    //todo: use the following code
    streamIn.pipe(convert.stdio[3]);
    vol['./test.jpg'] = null;
    convert.stdio[3]
      .pipe(WMStrm({ key: './test.jpg', destination: vol }))
      .on('finish', () => {
        resolve(Buffer.from(vol['./test.jpg'], 'binary').toString('base64'));
      });
    // vol['./test.jpg'] = null;
    // convert.stdout
    //   .pipe(WMStrm({ key: './test.jpg', destination: vol }))
    //   .on('finish', () => {
    //     resolve(Buffer.from(vol['./test.jpg'], 'binary').toString('base64'));
    //   });
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
