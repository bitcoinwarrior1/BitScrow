let test = require("tape")
let server = require("../js/server.js")

test('post "/recipientAccept/:userId" returns a string implying success', (t) => {
  request(app)
    .post("/recipientAccept/" + 1)
    .expect(200)
    .end(function(err, res) {
      t.false(err)
      t.true(res.body == "The buyer has been notified that you sent the goods")
      t.end()
    })
});
