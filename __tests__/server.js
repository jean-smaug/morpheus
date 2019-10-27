const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const characters = [
  {
    id: 1,
    name: "Luffy"
  },
  {
    id: 2,
    name: "Zoro"
  },
  {
    id: 3,
    name: "Kirito"
  }
];

router.get("/characters", ctx => {
  ctx.body = characters;
});

router.get("/characters/:id", ctx => {
  ctx.body = characters.find(
    character => character.id === Number(ctx.params.id)
  );
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => console.log("Ready for testing"));
