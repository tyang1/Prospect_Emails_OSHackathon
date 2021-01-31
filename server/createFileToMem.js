const fs = require('fs')
const path = require('path')
const { Readable } = require('stream')

function fileToMemfsFunc(file) {
  const readable = new Readable()
  readable._read = () => {} // _read is required but you can noop it

  return new Promise((resolve, reject) => {
    const json = {}
    let imagePath = path.resolve(__dirname, file)
    fs.readFile(imagePath, (err, data) => {
      if (err) reject(err)
      try {
        if (imagePath.includes('.jpg')) {
          readable.push(data)
          readable.push(null)
          json[imagePath.toString()] = readable
        } else if (imagePath.includes('.sh')) {
          json[imagePath.toString()] = data.toString()
        }
        resolve(json)
      } catch (err) {
        throw err
      }
    })
  })
}

function filesInPromises() {
  const imagePaths = [
    '../imgbuilder/dash.jpg',
    '../imgbuilder/out.jpg',
    '../imgbuilder/browser.jpg',
  ]
  return imagePaths.map(fileToMemfsFunc)
}

async function createInMemFileSys() {
  let files = filesInPromises()
  let combinedResult
  return new Promise(async (resolve, reject) => {
    try {
      let promisedFiles = Promise.all(files)
      await promisedFiles.then((results) => {
        combinedResult = results.reduce((accumulator, currentValue) => {
          const entry = Object.entries(currentValue)[0]
          accumulator[entry[0]] = entry[1]
          return accumulator
        }, {})
        resolve(combinedResult)
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  createInMemFileSys,
}
