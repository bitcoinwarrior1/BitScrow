var express = require('express')
var app = express()

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../bitreturn-knex/dev.sqlite3'
  },
  useNullAsDefault: true
})

var path = require("path")
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname));
var fs = require("fs")
var request = require("superagent")

  app.post("/accept/:signature",function(req,res){

    knex("bitscrowdb").select().where("signature",req.params.signature)
    .then(function(data){
      if(data){
        payout(data.body.value)
      }
      else{
        console.log("Signature not found!")
      }
    })
    .then(function(data){
      res.send(data.body)
    })
    .catch(function(err){
      throw err
    })
})

function payout(value){

  app.post("/payment",function(req,res){

    res.header( 'Access-Control-Allow-Origin','*' );
    var query = "http://localhost:3000/merchant/$guid/payment?password=$" +
    + req.body.password + "&to=$" + req.body.to + "&" +
    "amount=$" + req.body.amount + "&from=$" + "&note=$" + "BitReturn tax rebate from BitReturn.com"

    res.header( 'Access-Control-Allow-Origin','*' );

    request.get(query,function(err,data){
      console.log("here's the data I got from the API", data.text)
      res.send(data)
    })
  })
}

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

app.post("/v1", function(req,res){

  res.header( 'Access-Control-Allow-Origin','*' );

  var txId = req.body.infoObj.tx
  var query = "https://blockchain.info/rawtx/"+txId+"/$tx_hash"
  res.header( 'Access-Control-Allow-Origin','*' );

  request.get(query, function(err, data){
    console.log("here's the data I got from the API", data.text )

    //save to sql
    knex('bitscrowdb').insert({
      tx: txId,
      value:data.body.out[0].value,
      signature:req.body.infoObj.bitcoinSignature,
      recipientAddr:data.body.infoObj.recipientAddr,
      userAddr:data.body.infoObj.bitcoinAddress,
      emailAddress:data.body.infoObj.emailAddress,
      recipientAddr: data.body.infoObj.recipientAddress
    })
    .then(function(data){
      console.log("success!!!" ,data)
    })
    .catch(function(err){
      console.log(err)
    })
    // send to client
    res.json(data.body)
  })

})

module.exports = app;
