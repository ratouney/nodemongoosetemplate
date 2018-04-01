
var express = require('express');
var router = express.Router();
var Account = require('../schemas/accounts');
var lodash = require('lodash');
var app = express;

/* GET home page. */
router.get('/', function(req, res, next) {
    Account.find(req.query, function(err, result) {
        res.json(result);
    });
});

router.post('/new', function(req, res, next) {
    const newObj = new Account(req.query);
    newObj.save(err => {
        if (err) {
            if (err.code == 11000) {
                res.status(400).json({errors: "User " + newObj.ign + " already exists"});
            } else {
                const logs = lodash.map(err.errors, function(elem) { 
                    return {field: elem.path, msg: elem.message};
                });
                const full = logs.reduce( (a,b) => {
                    return a[b.field] = b.msg, a;
                }, {});
                res.status(400).json({errors: full});
            }
        } else {
            res.status(201).json(newObj);
        }
    })
});

router.put('/update', function(req, res, next) {
    const changes = req.query;
    const saved = req.query._id;
    delete changes._id;
    Account.findByIdAndUpdate({_id: saved}, { $set: changes }, { new: true, runValidators: true}, function(err, result) {
        if (err) {
            res.status(400).json({errors: err.toString()});
        } else {
            if (result == null) {
                res.json({errors: "Requested Account not found"});
            } else {
                res.json(result);
            }
        }
    });
})

router.delete('/delete', function(req, res, next) {
    if (req.query._id == undefined || req.query._id == null) {
        res.status(400).json({errors: "Please provide an _id"});
    } else {
        Account.deleteOne(req.query, function(err) {
            if (err) {
                res.status(400).json({errors: err});
            } else {
                res.json({message: "Account " + req.query._id + " has been deleted or has never existed"})
            }
        })
    }
})

module.exports = router;
