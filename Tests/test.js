var test = require("tape")
var server = require("../js/server.js")

test('get /v1/latestdata returns an object with the property value time', function(t) {
  request(app)
    .get('/v1/latestdata')
    .expect(200)
    .end(function(err, res) {
      t.false(err)
      t.true(res.body.hasOwnProperty('time'))
      t.end()
    })
});





