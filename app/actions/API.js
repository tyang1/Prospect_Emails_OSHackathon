const axios = require('axios').default;

export async function getImages(data, setImage) {
  await axios({
    url: `${process.env.DEV_API_URL}/images/preview`,
    method: 'post',
    data,
  })
    .then((response) => {
      let imageURL = `data:image/jpg;base64,${response.data}`;
      setImage(imageURL);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function downloadImage(data) {
  await axios({
    url: `${process.env.DEV_API_URL}/images/preview`,
    method: 'post',
    data,
  })
    .then(async (response) => {
      const link = document.createElement('a');
      link.href = `data:image/jpg;base64,${response.data}`;
      link.setAttribute('download', 'out.jpg'); //or any other extension
      document.body.appendChild(link);
      await link.click();
      document.body.removeChild(link);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}
