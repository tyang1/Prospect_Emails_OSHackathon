const { execFile, exec } = require('child_process');

module.exports = function reimage(userInputs = null) {
  const HEADER_TEXT = 'Notifications for Saturday123';
  const PUSH_NOTIF_HOST = 'OneSignalStyle.com';
  const URL_TEXT = 'bandolierstyle.com';

  return new Promise((resolve, reject) => {
    execFile(
      `sh gen_image.sh`,
      [`"${HEADER_TEXT}"`, `"${PUSH_NOTIF_HOST}"`, `"${URL_TEXT}"`],
      { cwd: process.cwd() + '/imgbuilder', shell: true },
      (err, stdout, stderr) => {
        if (err) {
          reject({ error: err });
        }
        resolve({ success: true });
      }
    );
  });
};
