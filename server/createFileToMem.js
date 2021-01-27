const fs = require('fs');
const path = require('path');

function fileToMemfsFunc(file) {
  return new Promise((resolve, reject) => {
    const json = {};
    let imagePath = path.resolve(__dirname, file);
    fs.readFile(imagePath, (err, data) => {
      if (err) reject(err);
      try {
        if (imagePath.includes('.jpg')) {
          json[imagePath.toString()] = Buffer.from(data, 'base64').toString(
            'base64'
          );
        } else if (imagePath.includes('.sh')) {
          json[imagePath.toString()] = data.toString();
        }
        resolve(json);
      } catch (err) {
        throw err;
      }
    });
  });
}

function filesInPromises() {
  const imagePaths = [
    '../imgbuilder/dash.jpg',
    '../imgbuilder/out.jpg',
    '../imgbuilder/browser.jpg',
  ];
  return imagePaths.map(fileToMemfsFunc);
}

async function createInMemFileSys() {
  let files = filesInPromises();
  let combinedResult;
  return new Promise(async (resolve, reject) => {
    try {
      let promisedFiles = Promise.all(files);
      await promisedFiles.then((results) => {
        combinedResult = results.reduce((accumulator, currentValue) => {
          const entry = Object.entries(currentValue)[0];
          accumulator[entry[0]] = entry[1];
          return accumulator;
        }, {});
        resolve(combinedResult);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createInMemFileSys,
};
