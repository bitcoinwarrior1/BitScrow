exports.up = function(knex, Promise) {
  console.log('create table')

  return knex.schema.createTableIfNotExists('bitscrowdb', function(table) {
    table.increments('id')
    table.string('tx').unique()
    table.string('value')
    table.string('signature')
    table.string('recipientAddr')
    table.string('userAddr')
    table.string('emailAddress')
    table.string('recipientEmail')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bitscrowdb').then(function () {
    console.log('bitscrowdb table was dropped')
  })
};
