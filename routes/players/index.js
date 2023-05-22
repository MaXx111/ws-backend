const Router = require('koa-router');
const players = require('../../db/players.js');

const router = new Router();

router.post('/players', (ctx) => {

  ctx.response.body = 'players';

  ctx.response.set('Access-Control-Allow-Origin', '*');

  const { name } = ctx.request.body;

  ctx.response.status = 200;

  if (players.some(nickname => nickname === name)) {
    ctx.response.body = { status: "exists" };
  
    return;
  }
    
  players.push(name)
  ctx.response.body = { status: "OK" };
});

router.delete('/players/', (ctx) => {
  const { phone } = ctx.params;

  ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.status = 500;
    ctx.response.body = { status: "ok" };
});

module.exports = router;
