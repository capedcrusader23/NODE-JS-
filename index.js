var express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');

var app=express();

mongoose.connect('mongodb://localhost/nin');
mongoose.Promise=global.Promise;
app.use(express.static('public'));

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(bodyparser.json());
//app.use(require('./routes/ninja'));
app.use(require('./ninja.js'));

app.use(function (err,req,res,next) {

    res.sendFile('./');
});


app.listen(4500,function () {
    console.log('Running');
});
