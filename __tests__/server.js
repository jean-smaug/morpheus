const Koa = require("koa");
const Router = require("koa-router");
const jwt = require("koa-jwt");
const characters = require("./characters.json");

const app = new Koa();
const router = new Router();

// Valid JWT --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.sr08LEMNntsBjm8vu8Xv1ciDBmKZUv-dRKiO2efI7KI
app.use(jwt({ secret: "SECRET" }));

router.get("/characters", ctx => {
  ctx.body = characters;
});

router.get("/characters/:id", ctx => {
  ctx.body = characters.find(
    character => character.id === Number(ctx.params.id)
  );
});

router.post("/characters", ctx => {
  ctx.status = 201;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000, () => console.log("Ready for testing"));
