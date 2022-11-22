var express = require('express');
var router = express.Router();
router.get('/', function(req, res,next) {
    res.render('form', {
        name: 'Khrah',
        blog: 'hwani68.tistory.com',
        homepage: 'gocode.net'
    });
});