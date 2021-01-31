const { spawn } = require('child_process')
const path = require('path')
const { vol } = require('memfs')
const fs = require('fs')

function getImage(vol = null) {
  return new Promise((resolve, reject) => {
    let outputPath = path.resolve(__dirname, '../imgbuilder/out.jpg')
    console.log('outputPath', outputPath)
    let data = vol[outputPath]
    // fs.readFile(imagePath, (err, data) => {
    //   if (err) reject(err);
    resolve(Buffer.from(data, 'base64'))
    // });
  })
}

function reImage(userInputs, memFileJson = null) {
  // vol.fromJSON(memFileJson)
  let streamInImgPath = path.resolve(__dirname, '../imgbuilder/dash.jpg')
  // console.log('try', memFileJson[streamInImgPath])
  console.log('vol image', fs.readFileSync(streamInImgPath))
  // update: using the regular file system works with streamIn.pipe
  // vol image <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 02 00 38 00 38 00 00 ff e2 0f f0 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 0f e0 61 70 70 6c 02 10 00 00 ... 34096 more bytes>
  // const streamIn = fs.createReadStream(streamInImgPath)
  const streamIn = memFileJson[streamInImgPath]

  const {
    notificationText = 'Notifications for Saturday123',
    siteUrl = 'OneSignalStyle.com',
    companyName = 'bandolierstyle.com',
  } = userInputs
  const HEADER_TEXT = notificationText
  const PUSH_NOTIF_HOST = companyName
  const URL_TEXT = siteUrl
  //note: example of exec function:
  //exec('"/path/to/test file/test.sh" arg1 arg2');
  const args = ['-', '-resize', '640x', '-']

  return new Promise((resolve, reject) => {
    const convert = spawn('convert', args, {
      cwd: process.cwd() + '/imgbuilder',
    })
    convert.stderr.on('data', (err) => {
      console.log('stderr', err)
    })
    convert.stdout.on('data', (data) => {
      console.log('spawn data', data)
    })
    streamIn.on('data', (data) => {
      console.log('data', data)
    })
    streamIn.pipe(convert.stdin)
    // convert.stdout.pipe(vol.createWriteStream('./test.jpg')).on('close', () => {
    //   console.log('downloadStream', vol.readFileSync('./test.jpg'))
    // })
    //note: do not delete:
    // let image = memFileJson[streamInImgPath];
    // resolve(Buffer.from(image, 'base64').toString('base64'));
  })
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
}
