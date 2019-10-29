const config = require('../../config.json');
const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.render('index');
});

routes.get('/instrucoes', (req, res) => {
    res.render('instructions');
});

routes.get('/creditos', (req, res) => {
    res.render('credits');
});

routes.get('/game', (req, res) => {
    res.render('game', {config: config});
});

routes.get('/joystick', (req, res) => {
    res.render('joystick');
});

module.exports = routes;