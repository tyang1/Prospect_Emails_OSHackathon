const axios = require('axios').default;

export async function getImages(data, setImage) {
  console.log('getImage', data);
  await axios({
    url: `${process.env.API_URL}/images`,
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
