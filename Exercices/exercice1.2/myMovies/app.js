var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//Middleware variables
var compteurFilm = 0;
var compteurMain = 0;
var compteurUsers =0;



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();
/*
const counterPath={
    "/films/":countFilm,
    "/users/":countUser,
    "/":countMain
}

app.use(function (req , res, next){
    let path = req.path;
    if(counterPath.hasOwnProperty(path)){

    }

});
*/

// Premier Essai
app.use(function (req , res, next){
    if(req.path == "/films/"){

    compteurFilm++;
    console.log(req.method + " " + req.path + " : " +compteurFilm);

    }else if (req.path == "/users/"){

        compteurUsers++;
        console.log(req.method + " " + req.path + " : " +compteurUsers);

    }else if(req.path == "/"){
        
    compteurMain++;
    console.log(req.method + " " + req.path + " : " +compteurMain);
    }

    next();
 });
 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);

module.exports = app;
