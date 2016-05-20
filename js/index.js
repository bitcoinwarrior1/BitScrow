//modules
var bitcoin = require('bitcoinjs-lib')
//my modules
var email = require("./email.js")
var sendToServer = require("./sendToServer.js")

$(function() {

  $("#button").click(clickButton)

  function verifySig(address,signature,message){
    //Verifies the bitcoin signature to prove ownership of donor address
    console.log("Verify")
    return bitcoin.message.verify(address,signature,message);
  }



  function clickButton(){

    var infoObj = {
      bitcoinAddress : $("#address").val(),
      recipientAddr : $("#recipientAddr").val(),
      tx : $("#TxId").val(),
      emailAddress : $("#emailAddress").val(),
      bitcoinSignature : $("#Signature").val(),
      recipientEmail : $("#recipientEmail").val()
    }

    if(verifySig(bitcoinAddress,bitcoinSignature, messageTest)){ //change to 'bitreturn'
      if(bitcoinAddress || recipientAddr || tx || emailAddress || bitcoinSignature || recipientEmail){
        console.log("verify passed")
        sendToServer.sendToServer(infoObj)
      }
    }
    else{
      alert("invalid signature provided")
    }
  }

});
