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

app.get("/v1/latestdata",function(req,res){
  fs.readFile("../transactionData.json","utf8",function(err,data){
    res.send(data)
  })
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

app.post("/v1/:tx", function(req,res){

  res.header( 'Access-Control-Allow-Origin','*' );
  
  var txId = req.params.tx
  var query = "https://blockchain.info/rawtx/"+txId+"/$tx_hash"
  res.header( 'Access-Control-Allow-Origin','*' );
  request.get(query, function(err, data){
    console.log("here's the data I got from the API", data.text )
    // save to db
    fs.writeFile("../transactionData.json",JSON.stringify(data.body),function(err,data){
      if(err) throw err
    })
    //save to sql
    knex('bitreturndb').insert({tx: txId, value:data.body.out[0].value,charityAddress:data.body.out[0].addr, donorAddress:data.body.inputs[0].prev_out.addr})
    //knex('bitreturndb').insert({tx: txId, value:exampleData.out[0].value,charityAddress:exampleData.out[0].addr, donorAddress:exampleData.inputs[0].prev_out.addr})
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
