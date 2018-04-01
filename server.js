var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');

var index = require('./routes/index');
var accounts = require('./routes/accounts');
var mongoose = require('mongoose');
var app = express();

var url = "mongodb://localhost:27017/cancertrack"
mongoose.connect(url, function(err) {
    if (err) throw err;
    console.log("Connected to DB !");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/accounts', accounts);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
            "code": 404,
            "error": res.locals.error,
            "message": res.locals.message
        });
});

module.exports = app;
app.listen(32000);