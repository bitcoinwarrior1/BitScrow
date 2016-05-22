let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../bitreturn-knex/dev.sqlite3'
  },
  useNullAsDefault: true
})

createEscrow: (userObj,callback) => {
  knex('bitscrowdb').insert({
    tx: userObj.txId,
    value:userObj.value,
    signature:userObj.bitcoinSignature,
    recipientAddr:userObj.recipientAddr,
    userAddr:userObj.bitcoinAddress,
    emailAddress:userObj.emailAddress,
    recipientEmail: userObj.recipientEmail
  })
  .then(function(data){
    callback(null,data)
  })
  .catch(function(err){
    callback(err)
    if (err) throw err
  })
}
