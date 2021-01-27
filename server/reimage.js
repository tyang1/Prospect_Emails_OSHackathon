const { spawn } = require('child_process');
const path = require('path');
const { fs, vol } = require('memfs');
// const fs = require('fs');

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

function reImage(userInputs, memFileJson = null) {
  vol.fromJSON(memFileJson);
  let streamInImgPath = path.resolve(__dirname, '../imgbuilder/out.jpg');
  let image = memFileJson[streamInImgPath];
  const streamIn = vol.createReadStream(streamInImgPath, 'utf8');

  console.log('streamIn', streamIn);

  const {
    notificationText = 'Notifications for Saturday123',
    siteUrl = 'OneSignalStyle.com',
    companyName = 'bandolierstyle.com',
  } = userInputs;
  const HEADER_TEXT = notificationText;
  const PUSH_NOTIF_HOST = companyName;
  const URL_TEXT = siteUrl;
  //note: example of exec function:
  //exec('"/path/to/test file/test.sh" arg1 arg2');
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
    // streamIn.pipe(convert.stdin);
    //todo: return ??
    resolve(Buffer.from(image, 'binary').toString('base64'));
    // return streamIn;
  });
  // return new Promise((resolve, reject) => {
  //   execFile(
  //     `sh gen_image.sh`,
  //     [`"${HEADER_TEXT}"`, `"${PUSH_NOTIF_HOST}"`, `"${URL_TEXT}"`],
  //     { cwd: process.cwd() + '/imgbuilder', shell: true },
  //     // { cwd: memFileJson['fakeImgPath'], shell: true },
  //     (err, stdout, stderr) => {
  //       if (err) {
  //         reject({ error: err });
  //       }
  //       let imagePath = path.resolve(__dirname, '../imgbuilder/out.jpg');
  //       // console.log('memFileJson', memFileJson[imagePath]);
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
