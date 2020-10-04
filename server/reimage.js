const { execFile, exec } = require('child_process');

module.exports = function reimage() {
  return new Promise((resolve, reject) => {
    exec(
      `sh gen_image.sh`,
      { cwd: process.cwd() + '/imgbuilder' },
      (err, stdout, stderr) => {
        if (err) {
          reject({ error: err });
        }
        resolve({ success: true });
      }
    );
  });
};
