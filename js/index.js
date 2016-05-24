//modules
let bitcoin = require('bitcoinjs-lib')
//my modules
let sendToServer = require("./sendToServer.js")

$( () => {

  $("#submit").click(clickButton())

  function verifySig (address,signature,message) {
    //Verifies the bitcoin signature to prove ownership of donor address
    console.log("Verify")
    return bitcoin.message.verify(address,signature,message);
  }

  function clickButton() {

    console.log("Button Clicked!")

    var messageTest = 'This is an example of a signed message.'

    var infoObj = {
      bitcoinAddress : $("#address").val(),
      recipientAddr : $("#recipientAddr").val(),
      tx : $("#TxId").val(),
      emailAddress : $("#emailAddress").val(),
      bitcoinSignature : $("#Signature").val(),
      recipientEmail : $("#recipientEmail").val()
    }

    if(verifySig(infoObj.bitcoinAddress,infoObj.bitcoinSignature, messageTest)){
      if( infoObj.bitcoinAddress || infoObj.recipientAddr || infoObj.tx || infoObj.emailAddress || infoObj.bitcoinSignature || infoObj.recipientEmail){
        console.log("verify passed")
        sendToServer.sendToServer(infoObj)
        alert("Escrow set up, check your email for details!")
      }
    }
    else{
      alert("invalid signature provided")
    }
  }

});
