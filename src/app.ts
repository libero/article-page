import Router, { RouterContext } from '@koa/router';
import Koa, { DefaultState, Middleware } from 'koa';
import renderTemplate from './middleware/render-template';
import routing from './middleware/routing';

export type AppState = DefaultState;

export type AppServiceContext = {};

export type AppContext = RouterContext<AppState, AppServiceContext>;

export type AppMiddleware = Middleware<AppState, AppContext>;

export type App = Koa<AppState, AppContext>;

export default (
  router: Router<AppState, AppServiceContext>,
): App => {
  const app = new Koa<AppState, AppContext>();

  app.context.router = router;

  app.use(renderTemplate());
  app.use(routing(router));

  return app;
};
