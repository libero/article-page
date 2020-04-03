import Router from '@koa/router';
import { AppServiceContext, AppState } from './app';
import Routes from './routes';
import article from './routes/article';

export default (): Router<AppState, AppServiceContext> => {
  const router = new Router<AppState, AppServiceContext>();

  router.get(Routes.Article, '/:id', article());

  return router;
};
