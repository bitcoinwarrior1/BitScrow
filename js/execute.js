var email = require("./email.js")

function execute(areConditionsMeet,value,donationAddress,bitcoinAddress,emailAddress){
  if(areConditionsMeet){

    var emailMessage = "The following recipient claims to have donated: " + value.toString() +
    + " to the following address: " + donationAddress + " using this address: " +
    + bitcoinAddress + " and claims back: " + value * 0.33; //taxes are 33%

    email.sendEmail("user",emailAddress,"Your Bitcoin charity tax back", emailMessage);
    //sendEmail("Admin","Ird@ird.govt.nz","Bitcoin charity tax back claim", emailMessage);
    alert("Submission complete, thank you!")
  }
  else{
    alert("Errors on page")
  }
}

module.exports = ({execute:execute})
