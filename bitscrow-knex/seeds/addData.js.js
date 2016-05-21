
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('bitscrowdb').del(),

    // Inserts seed entries
    knex('bitscrowdb').insert({
      tx:"a52236a2a48cf44d0168fe9ee1eadf1c44cf32491c51669d3c098cb062adb7b52016",
      value:"6.63",
      signature:"HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE",
      recipientAddr:"13wCwgttgJFYZVJmvWb6kGbg1FJNf9U9EY",
      userAddr:"1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN",
      emailAddress:"bitcoinsetupnz@gmail.com",
      recipientEmail:"btcverifiednz@gmail.com"
    })
  );
};
