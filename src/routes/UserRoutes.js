const router = require('express').Router();
const user = require('../controllers/UserController');
const verifyJWT = require('../config/verifyJWT');

router.route('/')
    .get(verifyJWT, user.Home);

router.route('/register')
    .get(user.RegisterPage)
    .post(user.CreateUser);

router.route('/login')
    .get(user.LoginPage)
    .post(user.Login);

router.route('/users')
    .get(user.FindAll);

router.route('/bag')
    .get(verifyJWT, user.Bag);

router.route('/remove/:pokename')
    .get(verifyJWT, user.RemovePoke)
    .delete(verifyJWT, user.RemovePoke);

module.exports = function (app) {
    app.use('/', router);
}
