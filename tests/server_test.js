const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const app = require('../server/server.js');
const request = require('supertest')(app);

const imagePath = '../imgbuilder/dash.jpg';

describe('Image Server Test', () => {
  it('POST request to /images with correctly formatted body creates an image', async (done) => {
    request
      .post('/images')
      .set('content-type', 'multipart/form-data')
      .attach('website', fs.readFileSync(imagePath))
      .attach('icon', fs.readFileSync(imagePath))
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.not.be.null;
      });
    done();
  });
});
