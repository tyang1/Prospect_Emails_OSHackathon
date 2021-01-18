const { execFile, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

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
  const {
    notificationText = 'Notifications for Saturday123',
    siteUrl = 'OneSignalStyle.com',
    companyName = 'bandolierstyle.com',
  } = userInputs;
  const HEADER_TEXT = notificationText;
  const PUSH_NOTIF_HOST = companyName;
  const URL_TEXT = siteUrl;
  return new Promise((resolve, reject) => {
    execFile(
      `sh gen_image.sh`,
      [`"${HEADER_TEXT}"`, `"${PUSH_NOTIF_HOST}"`, `"${URL_TEXT}"`],
      { cwd: process.cwd() + '/imgbuilder', shell: true },
      (err, stdout, stderr) => {
        if (err) {
          reject({ error: err });
        }
        let imagePath = path.resolve(__dirname, '../imgbuilder/out.jpg');
        fs.readFile(imagePath, (err, data) => {
          if (err) reject(err);
          resolve(Buffer.from(data, 'binary').toString('base64'));
        });
      }
    );
  });
}

module.exports = {
  getImage,
  reImage,
};
