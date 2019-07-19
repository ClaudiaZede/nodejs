var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
/* SET user from _id with new data for an update into mongoDB . */
router.route('/:_id').get(function (req, res) {
 console.log('req.originalUrl : ', req.originalUrl);
 global.db.collection('users').update(
{_id: new ObjectID(req.params._id)},
{$set: req.query},
 function (err, result) {
 if (err) { throw err; }
 console.log('modifyUser: ', result);
 global.db.collection('users').find({ _id: new ObjectID(req.params._id)
 }).toArray(function (err, result) {
 if (err) { throw err; }
 console.log('users: ', result);
 res.render('modifyUser', {
 title: 'User modified without error',
 user: result[0]
 });
 }); // fin du find() après update
 } // fin callback de l'update
 ); // fin de l'update()
}); // fin de la gestion de la route
module.exports = router;