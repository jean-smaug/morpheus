const Koa = require("koa");
const Router = require("@koa/router");
const jwt = require("koa-jwt");
const basicAuth = require('koa-basic-auth');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

//== Auth ==//
router.get("/auth/basic", basicAuth({ name: "jean", pass: "smaug" }), ctx => {
  ctx.status = 200;
});

router.get("/auth/digest", ctx => {
  ctx.status = 200;
});

// Valid JWT --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.sr08LEMNntsBjm8vu8Xv1ciDBmKZUv-dRKiO2efI7KI
router.get("/auth/bearer", jwt({ secret: "SECRET" }), ctx => {
  ctx.status = 200;
});

router.get("/auth/hawk", ctx => {
  ctx.status = 200;
});

//== Body ==//
router.post("/body/multipart-form", koaBody(), ctx => {
  ctx.body = ctx.request.body
})

router.post("/body/form-url-encoded", koaBody(), ctx => {
  ctx.body = ctx.request.body
})

router.post("/body/json", koaBody(), ctx => {
  ctx.body = ctx.request.body
})

router.post("/body/xml", ctx => {
  ctx.body = ctx.request.body
})

router.post("/body/yaml", ctx => {
  ctx.body = ctx.request.body
})

router.post("/body/edn", ctx => {
  ctx.body = ctx.request.body
})

//== Misc ==//
router.get("/misc/query-params", ctx => {
  ctx.body = { query: ctx.query }
  ctx.status = 200
})

router.get("/misc/headers", ctx => {
  const requestHeaders = ctx.request.headers
  delete requestHeaders['user-agent']

  ctx.set(requestHeaders)
  ctx.status = 200
})

router.get("/misc/documentation", ctx => {
  ctx.status = 200
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000, () => console.log("Ready for testing"));
