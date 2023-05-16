const combineRouters = require('koa-combine-routers');

const index = require('./index/index.js');
const players = require('./players/index.js');

const router = combineRouters(
  index,
  players,
);

module.exports = router;
