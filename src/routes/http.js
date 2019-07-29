const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.render('index');
});

routes.get('/joystick', (req, res) => {
    res.render('joystick');
});

module.exports = routes;