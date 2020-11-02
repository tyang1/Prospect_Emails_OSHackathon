const { execFile, exec } = require('child_process');

module.exports = function reimage(userInputs) {
  const {
    notificationText = 'Notifications for Saturday123',
    siteUrl = 'OneSignalStyle.com',
    companyName = 'bandolierstyle.com',
  } = userInputs;
  console.log('inside reimage', notificationText);
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
        resolve({ success: true });
      }
    );
  });
};
