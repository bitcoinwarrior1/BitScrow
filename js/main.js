

  function getValue(totalValue,time){
    if(totalValue != undefined){
      value = totalValue/100000000; //100 million satoshi's in a bitcoin
      console.log("value: ",value)
      $("#amount").val(value)
      $("#taxAmount").val(value*0.33)
      $("#date").val(time)
    }
    else{
      areConditionsMeet = false
    }
  }

  function donorAddress(address){
    var bitcoinAddress = $("#address").val().toString();
    var donationAddress = $("#charityAddress").val().toString();
    
    if(address == bitcoinAddress){
      console.log("address matches (user does own the tx out)")
      return true
    }
    else{
      console.log("address does not match (USER DOESN'T OWN THE TX OUT)")
      areConditionsMeet = false
    }
  }

  function matchAddress(recipient){

    if(donationAddress == recipient){
      console.log("funds were sent to charity address")
      return true
    }
    else{
      console.log("funds were NOT sent to charity address")
      areConditionsMeet = false
    }
  }

module.exports = {getValue:getValue, donorAddress:donorAddress, matchAddress: matchAddress}
