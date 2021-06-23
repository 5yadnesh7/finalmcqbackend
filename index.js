var http = require("http");
var express = require('express');
var app = express();
var cors = require('cors');
var connection = require('./connection');

// app.use(
//     cors({
//         origin: ["http://localhost:3001"],
//         methods: ["GET", "POST"],
//         credentials: true,
//     })
// );
app.use((req,res,next)=>{
    res.setHeader('Acces-Control-Allow-Origin','*');
    res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
    next(); 
})
app.use(cors());  
//create app server
// var server = app.listen(9000,  "127.0.0.1", function () {

//     var host = server.address().address
//     var port = server.address().port
  
//     console.log("Example app listening at http://%s:%s", host, port)
  
// });

const port = process.env.PORT || 5000;

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port ${port}`);
});

app.get('/', (req, res) => {
    res.send("hello yadnesh");
    connection.query('select * from coursetab', function (error, results, fields) {
        if (error){console.log(error);}else{
        res.end(JSON.stringify(results));}
    });
});
//load coursetab
app.get('/coursetab', function (req, res) {
    connection.query('select * from coursetab', function (error, results, fields) {
        if (error){console.log(error);}else{
        res.end(JSON.stringify(results));}
    });
});
//load topictab
app.get('/topictab', function (req, res) {
    connection.query('select * from topictab', function (error, results, fields) {
        if (error){console.log(error);}else{
        res.end(JSON.stringify(results));}
    });
});
//load mcqtab
app.get('/mcqtab', function (req, res) {
    connection.query('select * from mcqtab', function (error, results, fields) {
        if (error){console.log(error);}else{
        res.end(JSON.stringify(results));}
    });
});
//insert mcqtab
app.post('/mcqtabdata/:qus/:op1/:op2/:op3/:op4/:cop/:tid', function (req, res) {
    var qus = req.params.qus;
    var op1 = req.params.op1;
    var op2 = req.params.op2;
    var op3 = req.params.op3;
    var op4 = req.params.op4;
    var cop = req.params.cop;
    var tid = req.params.tid;
    var question = qus.replace("questionmarkwrap" , "?");
    var option1 = op1.replace("questionmarkwrap" , "?");
    var option2 = op2.replace("questionmarkwrap" , "?");
    var option3 = op3.replace("questionmarkwrap" , "?");
    var option4 = op4.replace("questionmarkwrap" , "?");
    var coption = cop.replace("questionmarkwrap" , "?");
    var query = "INSERT INTO mcqtab (Question,Op1,Op2,Op3,Op4,Cop,topid) VALUES (?,?,?,?,?,?,?)";
    connection.query(query,[question,option1,option2,option3,option4,coption,tid], function (error, results, fields) {
     if (error){console.log(error);}else{
     res.end(JSON.stringify(results));}
   });
});
//insert coursetab
app.post('/incoursetab/:cname/:dsp', function (req, res) {
    var cname = req.params.cname;
    var dsp = req.params.dsp;
    var query = "INSERT INTO coursetab (CourseName,dsp) VALUES (?,?)";
    connection.query(query,[cname,dsp], function (error, results, fields) {
     if (error){console.log(error);}else{
     res.end(JSON.stringify(results));}
   });
});
//insert coursetab
app.post('/intopictab/:topnm/:dsp/:cid', function (req, res) {
    var cid = req.params.cid;
    var topnm = req.params.topnm;
    var dsp = req.params.dsp;
    var query = "INSERT INTO topictab (TopicName,dsp,cid) VALUES (?,?,?)";
    connection.query(query,[topnm,dsp,cid], function (error, results, fields) {
     if (error){console.log(error);}else{
     res.end(JSON.stringify(results));}
   });
});
//join coursetab and topictab
app.get('/join', function (req, res) {
    connection.query('SELECT coursetab.cid, coursetab.CourseName, topictab.tid, topictab.TopicName FROM coursetab LEFT JOIN topictab ON coursetab.cid=topictab.cid;', function (error, results, fields) {
        if (error){console.log(error);}else{
        res.end(JSON.stringify(results));}
    });
});
