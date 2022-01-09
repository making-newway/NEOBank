const route = require('express').Router();
const { display, signup, signin, index } = require('../controller/customer');

route.get('/', index);
route.get('/:id', display);
route.post('/add', signup);
route.post('/signin', signin);

module.exports = route;