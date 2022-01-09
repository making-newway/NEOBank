const route = require('express').Router();
const { displayTransactions, addFunds, withdrawFunds, transferFunds } = require('../controller/funds');

route.get('/:id', displayTransactions);
route.post('/:id/addFunds', addFunds);
route.post('/:id/withdraw', withdrawFunds);
route.post('/:id/transfer', transferFunds);

module.exports = route;