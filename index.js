const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const WS = require('ws');

const app = new Koa();

const router = require('./routes');

app.use(koaBody({
  urlencoded: true,
}));

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }

    ctx.response.status = 204;
  }
});

//TODO: write code here

app.use(router());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

const wsServer = new WS.Server({
  server
});

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {

    const eventData = JSON.parse(message.toString());

    setMsg(eventData);
    Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => {
        let msg = getMsg(eventData)
          client.send(JSON.stringify(msg));
        })
  });

  ws.send(JSON.stringify(chat));
});

server.listen(port);

const chat = [];

function setMsg(obj) {
    let date = new Date();
    let today = date.toLocaleString();
    obj.date = today
    chat.push(obj)
}

function getMsg(obj) {
    let chatForFilter = chat;
    chatForFilter.filter(item => {
        item.nick === obj.nick;
    });

    let msg
    chatForFilter.forEach(item => {
        if(item.message === obj.message) {
            msg = item;
        }
    })

    return msg;
}
