const createRepos = ({ createImage, getImage }) => ({
  type: 'imageInterface',
  createImage: createImage,
  getImage: getImage,
});

export default createRepos;
