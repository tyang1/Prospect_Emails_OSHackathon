const { createInMemFileSys } = require('./createFileToMem.js');
const { getImage } = require('./getImage');
const server = require('./server.js');
const createRepos = require('./repos.js');

// require('dotenv').config();

const port =
  process.env.NODE_ENV === 'development'
    ? process.env.DOTENV_CONFIG_PORT || 8080
    : process.env.PORT;
const hostname =
  process.env.NODE_ENV === 'development'
    ? process.env.DOTENV_CONFIG_HOST || '0.0.0.0'
    : process.env.HOSTNAME;

const repos = createRepos({ createImage: createInMemFileSys, getImage });
// here we abstract away the instantiation of the server connection
// when the port is ready, and using repo for the liskov subs. principle
const app = server.start({ port, hostname, repos }).then((app) => app);

module.exports = app;
