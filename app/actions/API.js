const axios = require('axios').default;

export async function getImages(data, setImage) {
  console.log('inside getImages API');

  await axios({
    url: 'http://localhost:8080/images',
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
