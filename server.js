var express = require('express')
var app = express()
var email = require("./js/email")
var bodyParser = require('body-parser')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './bitscrow-knex/dev.sqlite3'
  },
  useNullAsDefault: true
})

var path = require("path")
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname));
var fs = require("fs")
var request = require("superagent")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/accept/:signature",(req,res) => {

  knex("bitscrowdb").select().where("signature",req.params.signature)
  .then((data) => {
    if(data){
      payout(data.body.value, data.body.recipientAddr) 
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
    var message = "The buyer with the following bitcoin address: " + req.body.recipientAddr
    message += "has accepted the deal and claims to have delivered on their end of the deal"
    message += "please click here when you recieve the goods: "
    message += "http://localhost:3000/accept/" + data.body.signature

    email.sendEmail(data.body.emailAddress, data.body.emailAddress,"BitScrow buyer response", message)
    res.send("The buyer has been notified that you sent the goods")
  })
  .catch((err) => {
    if (err) throw err
  })
})

 function payout (value,recipientBtcAddr) {

  var query = "http://localhost:3000/merchant/$guid/payment?password=$" +
  + password + "&to=$" + recipientBtcAddr + "&" +
  "amount=$" + value + "&from=$" + "&note=$" + "BitScrow escrow payment"

  request.get(query,(err,data) => {
    res.header( 'Access-Control-Allow-Origin','*' );
    console.log("here's the data I got from the API", data.text)
    res.send(data)
  })
}

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

app.post("/v1/", (req,res) => {

  res.header( 'Access-Control-Allow-Origin','*' );
  console.log(req.body)
  var txId = req.body.tx
  var query = "https://blockchain.info/rawtx/"+txId+"/$tx_hash"
  res.header( 'Access-Control-Allow-Origin','*' );

  request.get(query, (err, data) => {
    console.log("here's the data I got from the API", data.text )
    //save to sql
    knex('bitscrowdb').insert({
      tx: txId,
      value:data.body.out[0].value,
      signature:req.body.bitcoinSignature,
      recipientAddr:req.body.recipientAddr,
      userAddr:data.body.bitcoinAddress,
      emailAddress:data.body.emailAddress,
      recipientEmail: data.body.recipientEmail
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
