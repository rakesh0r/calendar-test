const request = require('supertest');

let server;

beforeEach(function () {
  server = require('./index');
});

afterEach(function () {
  server.close();
});

describe('something', function () {
  it('example test', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Hello');
      })
      .end(done);
  });

  it('example test 1', (done) => {
    request(server)
      .get('/patients/119')
      .expect(200)
      .end(done);
  });

  it('example test 2', (done) => {
    request(server)
      .get('/does/not/exist')
      .expect(404, done);
  });
});
