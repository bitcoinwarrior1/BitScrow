let mandrill = require('node-mandrill')("QgDuw-mLtNpqRzATEXVnqA")

  sendEmail: ( _name, _email, _subject, _message) => {
      mandrill('/messages/send', {
          message: {
              to: [{email: _email , name: _name}],
              from_email: 'j.l.sangalli@gmail.com',
              subject: _subject,
              text: _message
          }
      }, (error, response) => {
          if (error) console.log( error );
          else console.log(response);
      });
  }

module.exports = {sendEmail:sendEmail}
