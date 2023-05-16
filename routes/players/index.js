const Router = require('koa-router');

const router = new Router();

router.post('/players', (ctx) => {

  ctx.response.body = 'players';

  ctx.response.set('Access-Control-Allow-Origin', '*');

  
    ctx.response.status = 200;
    ctx.response.body = { status: "player exists" };


  ctx.response.body = { status: "OK" };
});

router.delete('/players/', (ctx) => {
  const { phone } = ctx.params;

  ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.status = 200;
    ctx.response.body = { status: "ok" };

  ctx.response.body = { status: "OK" };
});

module.exports = router;
