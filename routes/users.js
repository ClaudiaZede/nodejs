var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
    global.db.collection('users').find().toArray(function(err, result) {
        if (err) {
            throw err;
        }
        console.log('users: ', result);
        res.render('users', { title: 'List of users', users: result });
    });
});
module.exports = router;