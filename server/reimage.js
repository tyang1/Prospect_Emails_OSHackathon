const { spawn, execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const { WMStrm } = require('./wStream.js');
const { createCanvas, loadImage } = require('canvas');

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
  const { website, icon } = userInputs;
  let streamInImgPath = path.resolve(__dirname, '../imgbuilder/browser.jpg');
  let pushStreamInImgPath = path.resolve(__dirname, '../imgbuilder/push.jpg');
  let dashStreamInImgPath = path.resolve(__dirname, '../imgbuilder/dash.jpg');
  const browserStreamIn = vol[streamInImgPath];
  const pushStreamIn = vol[pushStreamInImgPath];
  const dashStreamIn = vol[dashStreamInImgPath];
  const websiteStreamIn = fs.createReadStream(Buffer.from(website.path));

  //Creating canvas for image composition:
  const width = 1024;
  const height = 768;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, width, height);
  const canvasStream = canvas.createJPEGStream();

  const {
    notificationText = 'Notifications for Saturday123',
    siteUrl = 'OneSignalStyle.com',
    companyName = 'bandolierstyle.com',
    e,
  } = userInputs;
  const HEADER_TEXT = notificationText;
  const PUSH_NOTIF_HOST = companyName;
  const URL_TEXT = siteUrl;
  // const args = [];
  const magicCommands = [
    'fd:3',
    '-size',
    '1024x768',
    'fd:4',
    '-size',
    '764x764',
    '-geometry',
    '+0+50',
    '-composite',
    'fd:7',
    '-resize',
    '764x764',
    '-geometry',
    '+0+60',
    '-composite',
    'fd:5',
    '-geometry',
    '+350+100',
    '-composite',
    'fd:6',
    '-geometry',
    '+200+220',
    '-composite',
    '-flatten',
    '-',
  ];
  const spawnOptions = {
    stdio: [
      'pipe', //default: stdio
      'pipe', //default: stdout
      'pipe', //default: stderr
      'pipe',
      'pipe',
      'pipe',
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
    canvasStream.pipe(convert.stdio[3]);
    browserStreamIn.pipe(convert.stdio[4]);
    pushStreamIn.pipe(convert.stdio[5]);
    dashStreamIn.pipe(convert.stdio[6]);
    websiteStreamIn.pipe(convert.stdio[7]);
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
