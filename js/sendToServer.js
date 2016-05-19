var request = require("superagent")
var index = require("./index.js")
var main = require("./main.js")

function sendToServer(txValue){
    console.log("local api initiated")
    request
      .post("http://localhost:3000/v1/"+txValue)    // post the tx to the server, let the server do the BC + DB stuff
      .send(txValue)
      .end(function(err,res){    // get a response back about the result
        if (err) throw err
        console.log('here is the response from the server', res.text)
        //var donorAddr = JSON.parse(res.text).inputs[0].prev_out.addr;
        //server format: replace exampleData with JSON.parse(res.text)
        var donorAddr = JSON.parse(res.text).inputs[0].prev_out.addr;
        console.log("this is the donor's address", donorAddr)
        var recipientAddr = JSON.parse(res.text).out[0].addr;
        console.log("this is the charity address", recipientAddr)
        var value = JSON.parse(res.text).out[0].value;
        console.log(value)
        var time = timeConverter(JSON.parse(res.text).time);
        console.log(time)
        if(txValue != undefined && donorAddr != undefined && recipientAddr != undefined){
          main.getValue(value,time)
          main.donorAddress(donorAddr)
          main.matchAddress(recipientAddr)
        }
      })
  }

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year + ' ';
    return time;
}

module.exports = {sendToServer:sendToServer}
