var express = require('express');
var router = express.Router();
/* Insert one new user into database. */
router.route('/').get(function (req, res) {
 console.log('req.originalUrl : ', req.originalUrl);
 global.db.collection('users').insert([req.query],
 function (err, result) {
 if (err) {
 throw err;
 }
 console.log('createUser: ', result);
 res.render('modifyUser', {
 title: 'Creating User without error with datas below :',
 user: result.ops[0]
 });
 } // fin callback de l'insert
 ); // fin de l'insert()
}); // fin de la gestion de la route
module.exports = router;