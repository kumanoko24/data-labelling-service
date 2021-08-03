require("dotenv").config();

require("./dbs.js");

const { event_search } = require("./lib/event_search.js");
const { event_put } = require("./lib/event_put.js");
const { did_search } = require("./lib/did_search.js");
const { label_search } = require("./lib/label_search.js");

const Koa = require("koa");
const Router = require("@koa/router");

const compress = require("koa-compress");
const body = require("koa-body");
const cors = require("@koa/cors");

const app = new Koa();
const router = new Router();

app.use(compress());
app.use(cors());
app.use(
  body({
    jsonLimit: "64mb",
    formLimit: "64mb",
    textLimit: "64mb",
  })
);

router.post("/events/search", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await event_search(ctx.request.body)) || [],
    };

    await next();
  } catch (err) {
    ctx.throw(err);
  }
});

router.post("/events", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await event_put(ctx.request.body)) || null,
    };

    await next();
  } catch (err) {
    ctx.throw(err);
  }
});

router.post("/dids/search", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await did_search(ctx.request.body)) || [],
    };

    await next();
  } catch (err) {
    ctx.throw(err);
  }
});

router.post("/labels/search", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await label_search(ctx.request.body)) || [],
    };

    await next();
  } catch (err) {
    ctx.throw(err);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(30876);
