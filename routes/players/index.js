const Router = require('koa-router');
const sub = require('../../db');

const router = new Router();

router.post('/players', (ctx) => {
  console.log(`in post players`)
  console.log(typeof ctx.request.body);
  console.log(ctx.request.body);

  ctx.response.body = 'players';

  const { name } = ctx.request.body;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (sub.data.some(sub => sub.name === name)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "player exists" };

    return;
  }

  sub.add({ name });

  ctx.response.body = { status: "OK" };
});

router.delete('/players/:phone', (ctx) => {
  const { phone } = ctx.params;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (sub.data.every(sub => sub.phone !== phone)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "players doesn\'t exists" };

    return;
  }

  sub.data = sub.data.filter(sub => sub.phone !== phone);

  ctx.response.body = { status: "OK" };
});

module.exports = router;
