const { spawn, execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const { WMStrm } = require('./wStream.js');
const { createCanvas, loadImage } = require('canvas');

//TODO, make the static image generation more dynamic
function createImage({ userInputs, vol, paths }) {
  const { website, icon, siteUrl, companyName, notificationText } = userInputs;
  let streamInImgPath = path.resolve(__dirname, paths['browser']);
  let pushStreamInImgPath = path.resolve(__dirname, paths['push']);
  let dashStreamInImgPath = path.resolve(__dirname, paths['dash']);
  const browserStreamIn = vol[streamInImgPath];
  const pushStreamIn = vol[pushStreamInImgPath];
  const dashStreamIn = vol[dashStreamInImgPath];
  const websiteStreamIn = fs.createReadStream(Buffer.from(website.path));
  const iconStreamIn = fs.createReadStream(Buffer.from(icon.path));
  //Creating canvas for image composition:
  const width = 1024;
  const height = 768;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, width, height);
  const canvasStream = canvas.createJPEGStream();

  const HEADER_TEXT = notificationText;
  const PUSH_NOTIF_HOST = companyName;
  const URL_TEXT = siteUrl;

  const magicCommands = [
    'fd:3', //BROWSER_IMGAGE
    '-size',
    '1024x768',
    'fd:4', //SCREENSHOT_IMAGE
    '-geometry',
    '764x764+0+50',
    '-composite',
    'fd:7', //PUSH_IMAGE
    // '-resize',
    // '764x764',
    '-geometry',
    '764x764+0+75',
    '-composite',
    'fd:5', //DASHBOARD_IMAGE
    '-geometry',
    '+550+150',
    '-composite',
    'fd:6',
    '-geometry',
    '+200+420',
    '-composite',
    '-pointsize',
    '15',
    '-annotate',
    '+70+70',
    `${URL_TEXT}`,
    '-pointsize',
    '15',
    '-annotate',
    '+15+35',
    `${companyName}`,
    'fd:8',
    '-geometry',
    '764x76+560+160',
    '-composite',
    '-pointsize',
    '15',
    '-annotate',
    '+680+180',
    "We're saving this for you!",
    '-pointsize',
    '15',
    '-annotate',
    '+680+200',
    `${HEADER_TEXT}`,
    '-pointsize',
    '15',
    '-annotate',
    '+680+225',
    "You're one step away.  Don't forget to checkout!",
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
    iconStreamIn.pipe(convert.stdio[8]);

    vol['./test.jpg'] = null;
    convert.stdout
      .pipe(WMStrm({ key: './test.jpg', destination: vol }))
      .on('finish', () => {
        resolve(vol);
      });
  });
}

async function getImage(userInputs, vol = null) {
  const paths = {
    browser: '../imgbuilder/browser.jpg',
    push: '../imgbuilder/push.jpg',
    dash: '../imgbuilder/dash.jpg',
  };
  return new Promise((resolve, reject) => {
    createImage({ userInputs, vol, paths })
      .then((vol) =>
        resolve(Buffer.from(vol['./test.jpg'], 'binary').toString('base64'))
      )
      .catch((err) => {
        console.error(err);
        reject(new Error(err));
      });
  });
}

module.exports = {
  getImage,
};
