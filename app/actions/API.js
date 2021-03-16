const axios = require('axios').default

export function getImages(data, setImage) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.DEV_API_URL}/images`,
      method: 'post',
      data,
    })
      .then((response) => {
        let imageURL = `data:image/jpg;base64,${response.data}`
        resolve(setImage(imageURL))
      })
      .catch((error) => {
        reject(new Error(error))
      })
  })
}

export function downloadImage(data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.DEV_API_URL}/images`,
      method: 'post',
      data,
    })
      .then(async (response) => {
        const link = document.createElement('a')
        link.href = `data:image/jpg;base64,${response.data}`
        link.setAttribute('download', 'out.jpg') //or any other extension
        document.body.appendChild(link)
        await link.click()
        resolve(document.body.removeChild(link))
      })
      .catch((error) => {
        reject(new Error(error))
      })
  })
}
