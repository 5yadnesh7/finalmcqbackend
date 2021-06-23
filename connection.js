var mysql = require('mysql');

var connection = mysql.createConnection({
    host     :  'freedb.tech',   //'localhost', //mysql database host name
    user     :  'freedbtech_YKtechnical',  //'root', //mysql database user name
    password :  'YKtechnical2125',  //'1234567890', //mysql database password
    database :  'freedbtech_exammcq',   //'mcqdb' //mysql database name
});
  
connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
})

module.exports = connection