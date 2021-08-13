require("dotenv").config();

require("./dbs.js");

const { event_search } = require("./lib/event_search.js");
const { event_put } = require("./lib/event_put.js");
const { did_search } = require("./lib/did_search.js");
const { label_search } = require("./lib/label_search.js");
const { lineage_put } = require("./lib/lineage_put.js");
const { lineage_search } = require("./lib/lineage_search.js");

module.exports.event_search = event_search;
module.exports.event_put = event_put;
module.exports.did_search = did_search;
module.exports.label_search = label_search;
module.exports.lineage_put = lineage_put;
module.exports.lineage_search = lineage_search;

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
    ctx.throw(400, err.toString());
  }
});

router.post("/event", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await event_put(ctx.request.body)) || null,
    };

    await next();
  } catch (err) {
    ctx.throw(400, err.toString());
  }
});

router.post("/dids/search", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await did_search(ctx.request.body)) || [],
    };

    await next();
  } catch (err) {
    ctx.throw(400, err.toString());
  }
});

router.post("/labels/search", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await label_search(ctx.request.body)) || [],
    };

    await next();
  } catch (err) {
    ctx.throw(400, err.toString());
  }
});

router.post("/lineage", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await lineage_put(ctx.request.body)) || [],
    };

    await next();
  } catch (err) {
    ctx.throw(400, err.toString());
  }
});

router.post("/lineage/search", async (ctx, next) => {
  try {
    ctx.response.body = {
      result: (await lineage_search(ctx.request.body)) || [],
    };

    await next();
  } catch (err) {
    ctx.throw(400, err.toString());
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(30876);
