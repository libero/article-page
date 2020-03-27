import { OK } from 'http-status-codes';
import Koa, { DefaultState, ExtendableContext } from 'koa';

export type AppState = DefaultState;

export type AppContext = ExtendableContext;

export type App = Koa<AppState, AppContext>;

export default (): App => {
  const app = new Koa<AppState, AppContext>();

  app.use(async ({ response }: AppContext): Promise<void> => {
    response.status = OK;
  });

  return app;
};
