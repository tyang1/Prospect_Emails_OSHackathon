const axios = require('axios').default;

export async function getImages(formData) {
        console.log("inside getImages API")
        axios.post('http://localhost:3000/images', {
            ...formData
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });


    }

