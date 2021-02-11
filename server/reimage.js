const { spawn, execFile } = require('child_process');
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
  let streamInImgPath = path.resolve(__dirname, '../imgbuilder/browser.jpg');
  let pushStreamInImgPath = path.resolve(__dirname, '../imgbuilder/push.jpg');
  let dashStreamInImgPath = path.resolve(__dirname, '../imgbuilder/shot.jpg');
  const browserStreamIn = vol[streamInImgPath];
  const pushStreamIn = vol[pushStreamInImgPath];
  const dashStreamIn = vol[dashStreamInImgPath];

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
    'fd:4',
    '-size',
    '1024x768',
    // 'canvas:white',
    'fd:5',
    '-geometry',
    '764x764+0+50',
    '-composite',
    'fd:3',
    '-geometry',
    '+550+150',
    // '-composite',
    // 'fd:5',
    // '-geometry',
    // '+200+420',

    // '-fill',
    // 'rgba(255, 80, 199, 1)',
    '-flatten',
    // 'out.jpg',
    '-',
    // '+append',
  ];
  const spawnOptions = {
    stdio: [
      'pipe',
      'pipe',
      'pipe',
      'pipe', // arrowBuffer1
      'pipe', // arrowBuffer2
      'pipe',
      'pipe',
      'pipe',
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
    browserStreamIn.on('data', (data) => {
      console.log('data', data);
    });
    browserStreamIn.pipe(convert.stdio[3]);
    dashStreamIn.pipe(convert.stdio[4]);
    pushStreamIn.pipe(convert.stdio[5]);
    vol['./test.jpg'] = null;
    convert.stdout
      .pipe(WMStrm({ key: './test.jpg', destination: vol }))
      .on('finish', () => {
        console.log('did it??', vol['./test.jpg']);
        resolve(Buffer.from(vol['./test.jpg'], 'binary').toString('base64'));
      });
  });
}

module.exports = {
  getImage,
  reImage,
};
