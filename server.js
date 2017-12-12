const koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { graphqlSchema } = require('./schema');

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

router.post('/graphql', koaBody(), async (ctx) => {
  ctx.state.user = { id: '1', name: 'Anakin Skywalker' };
  return graphqlKoa({ schema: graphqlSchema, context: ctx })(ctx, null);
});
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => console.log(`Open localhost:${PORT}/graphiql`));
