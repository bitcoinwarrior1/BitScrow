let test = require("tape")
let server = require("../js/server")
let testDb = require("./testDb")

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

let testObj = {
  tx: "a52236a2a48cf44d0168fe9ee1eadf1c44cf32491c51669d3c098cb062adb7b52016",
  value:"0.0024984",
  signature: "HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE",
  recipientAddr: "16eYNDYgUbR3JJpeQvwMDJowF3MPnSmhpx",
  userAddr: "3CRr25ymr8Cza1WEfmRmAjSBNhQhADfVfB",
  emailAddress: "btcverifiednz@gmail.com",
  recipientEmail: "bitcoinsetupnz@gmail.com"
}


test("tests create user database function",(t) => {
  testDb.createEscrow(testObj,(err,data) => {
    if (err) {
      console.log(err)
    }
    t.ok(data,"Something came back!")
    t.equal(typeof data, 'number', "it returns an id number")
    t.end()
  })
})
