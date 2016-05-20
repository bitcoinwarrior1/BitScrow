var request = require("superagent")
var email = require("./email.js")


function sendToServer(infoObj){
  request
    .post("http://localhost:3000/v1/")    // post the tx to the server, let the server do the BC + DB stuff
    .send(infoObj)
    .end(function(err,res){    // get a response back about the result
      if (err) throw err
      console.log('here is the response from the server', res.text)
    })
  }

module.exports = {sendToServer:sendToServer}
