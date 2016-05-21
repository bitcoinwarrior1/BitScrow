let express = require('express')
let app = express()
let email = require("./js/email")

let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../bitreturn-knex/dev.sqlite3'
  },
  useNullAsDefault: true
})

let path = require("path")
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname));
let fs = require("fs")
let request = require("superagent")

app.post("/accept/:signature",(req,res) => {

  knex("bitscrowdb").select().where("signature",req.params.signature)
  .then((data) => {
    if(data){
      payout(data.body.value * 0.99 , data.body.recipientAddr) //1% fee
    }
    else{
      console.log("Signature not found!")
    }
  })
  .then((data) => {
    res.send("payment released to the buyer! Thank you!")
  })
  .catch((err) => {
    throw err
  })
})

app.post("/recipientAccept/:userId",(req,res) => {
  knex("bitscrowdb").select().where("id",req.params.userId)
  .then((data) => {
    let message = "hi, the buyer with the following bitcoin address: " + req.body.recipientAddr +
    + "has accepted the deal and claims to have delivered on their end of the deal" +
    + "please click here when you recieve the goods: " + "http://localhost:3000/accept/" + data.body.signature;

    email.sendEmail(data.body.emailAddress, data.body.emailAddress,"BitScrow buyer response", message)
    res.send("The buyer has been notified that you sent the goods")
  })
  .catch((err) => {
    if (err) throw err
  })
})

 payout: (value,recipientBtcAddr) => {

  app.post("/payment",(req,res) => {

    let password = process.ENV.blockchainPassword;

    res.header( 'Access-Control-Allow-Origin','*' );

    let query = "http://localhost:3000/merchant/$guid/payment?password=$" +
    + password + "&to=$" + recipientBtcAddr + "&" +
    "amount=$" + value + "&from=$" + "&note=$" + "BitReturn tax rebate from BitReturn.com"

    res.header( 'Access-Control-Allow-Origin','*' );

    request.get(query,(err,data) => {
      console.log("here's the data I got from the API", data.text)
      res.send(data)
    })
  })
}

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

app.post("/v1", (req,res) => {

  res.header( 'Access-Control-Allow-Origin','*' );

  let txId = req.body.infoObj.tx
  let query = "https://blockchain.info/rawtx/"+txId+"/$tx_hash"
  res.header( 'Access-Control-Allow-Origin','*' );

  request.get(query, (err, data) => {
    console.log("here's the data I got from the API", data.text )
    //save to sql
    knex('bitscrowdb').insert({
      tx: txId,
      value:data.body.out[0].value,
      signature:req.body.infoObj.bitcoinSignature,
      recipientAddr:data.body.infoObj.recipientAddr,
      userAddr:data.body.infoObj.bitcoinAddress,
      emailAddress:data.body.infoObj.emailAddress,
      recipientEmail: data.body.infoObj.recipientEmail
    })
    .then((data) => {
      console.log("success!!!" ,data)
    })
    .catch((err) => {
      console.log(err)
    })
    // send to client
    res.json(data.body)
  })

})

module.exports = app;
