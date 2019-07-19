var express = require("express");
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;

var appContext;
var url = require("url");
function dynamicRouter(app) {
 //-- Context applicatif
 appContext = app;
 // -- Perform Automate action
 router.use(manageAction);
 // -- routeur global
 appContext.use(router);
}
/* Fonction qui permet d'aguiller les requêtes HTTP
vers le bon contrôleur en fonction de l'action du pathname */
function manageAction(req, res, next) {
    var path; // Le pathname après le port 3000 dans l'URL.
    var type; //(GET ou POST, ... http méthode)
    var controler; // nom du contrôleur à charger
    path = url.parse(req.url).pathname;
    // Il faut supprimer pour le routage le param après l'action
    if (path.split('/').length > 0) path = '/'+path.split('/')[1]
    // On récupère la méthode HTTP : GET ou POST
    type = req.method;
    // [type + path] permet de retrouver le bon contrôleur
    if (typeof GLOBAL.actions_json[type + path] == 'undefined') {
    console.log("Erreur pas d'action : " + path);
    next();
    }
    else {
    instanceModule = require('./routes/'
    + GLOBAL.actions_json[type + path].controler);
    router.use(path, instanceModule);
    next();
    }
   }
   module.exports = dynamicRouter;

   /* Delete one user into database. */
router.route('/:_id').get(function (req, res) {
    // ici on a un élément en plus _id dans l'URL "/deleteUser/5b0d5e95488eaf5161489a1e"
    // on découpe l'url et on ne récupère que le premier élément du tableau "deleteUser"
    // on ajoute devant un "/"
    var path = '/' + req.originalUrl.split('/')[1]; // retourne ‘/deleteUser’ dans path
    var type = req.method;
    console.log('req.originalUrl : ', req.originalUrl);
    global.db.collection('users').remove({_id: new ObjectID(req.params._id)},
    function (err, result) {
        if (err) {
            throw err;
        }
        console.log('createUser: ', result);
        global.db.collection("users").find().toArray(function(err, listusers) {
            res.render(global.actions_json[type+path].view, {
            title: 'List of users :',
            users: listusers
            });
        });
    } // fin callback du Delete
    ); // fin de l'insert()
}); // fin de la gestion de la route

module.exports = router;