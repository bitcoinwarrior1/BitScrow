//modules
var assert = require('assert')
var bitcoin = require('bitcoinjs-lib')
var assert = require('assert')
//my modules
var email = require("./email.js")
var sendToServer = require("./sendToServer.js")
var execute = require("./execute.js")
var main = require("./main.js")
//global vars:
var bitcoinAddress = "1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN"
//different addresses to other functions because only have test signature for these addresses
var donationAddress = "13wCwgttgJFYZVJmvWb6kGbg1FJNf9U9EY"
var tx = "a52236a2a48cf44d0168fe9ee1eadf1c44cf32491c51669d3c098cb062adb7b52016"
var emailAddress = "j.l.sangalli@gmail.com"
var bitcoinSignature = "HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE"
var messageTest = 'This is an example of a signed message.'
var value = 0
var areConditionsMeet = true //given true unless made false

$(function() {

  $("#button").click(clickButton)

  function verifySig(address,signature,message){
    //Verifies the bitcoin signature to prove ownership of donor address
    console.log("Verify")
    return bitcoin.message.verify(address,signature,message);
  }

  function clickButton(){
    
    var bitcoinAddress = $("#address").val().toString();
    var donationAddress = $("#charityAddress").val().toString();
    var tx = $("#TxId").val().toString();
    var emailAddress = $("#emailAddress").val().toString();
    var bitcoinSignature = $("#Signature").val().toString();

    if(verifySig(bitcoinAddress,bitcoinSignature, messageTest)){ //change to 'bitreturn'
      if((value || donationAddress || bitcoinAddress || emailAddress) != undefined){
        console.log("verify passed")
        sendToServer.sendToServer(tx)
        execute.execute(areConditionsMeet,value,donationAddress,bitcoinAddress,emailAddress)
      }
    }
    else{
      alert("invalid signature provided")
    }
  }

});








