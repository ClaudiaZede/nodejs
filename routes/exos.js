var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    global.db.collection('exercices').find().toArray(function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.render('exos', {
            stitle: 'First Cnx Mongo',
            title: 'Liste déroulante',
            exos: result
        });
    });
});
module.exports = router;