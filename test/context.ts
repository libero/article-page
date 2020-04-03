import Router, { RouterContext } from '@koa/router';
import { UnknownError } from 'http-errors';
import Koa, { Context, DefaultContext, DefaultContextExtends, DefaultStateExtends, } from 'koa';
import { Request as IncomingMessage, Response as ServerResponse } from 'mock-http';
import { AppContext } from '../src/app';

export type ErrorListener = (error: UnknownError, context: Context) => void;

export type Headers = Record<string, string>;

type ContextOptions = {
  body?: string;
  errorListener?: ErrorListener;
  headers?: Headers;
  method?: string;
  path?: string;
};

type RouterContextOptions<State extends DefaultStateExtends = DefaultStateExtends,
  Context extends DefaultContextExtends = DefaultContextExtends> = ContextOptions & {
  router: Router<State, Context>;
};

type AppOptions = ContextOptions & {
  params?: Record<string, string>;
};

const dummyRouter = {
  url(name: string): string {
    return `/path-to/${name}`;
  },
} as unknown as Router;

export const createContext = <Context extends DefaultContextExtends = DefaultContext>({
  body,
  errorListener,
  headers = {},
  method,
  path,
}: ContextOptions = {}): Context => {
  const app = new Koa();
  app.on('error', errorListener || jest.fn());

  const request = Object.create(app.request);
  request.app = app;
  request.req = new IncomingMessage({
    buffer: typeof body === 'string' ? Buffer.from(body) : undefined,
    headers: {
      ...headers,
      'content-length': typeof body === 'string' ? String(body.length) : undefined,
      host: 'example.com',
    },
    method,
    url: path,
  });

  const response = Object.create(app.response);
  response.req = request.req;
  response.res = new ServerResponse();

  return {
    app, method, path, request, response,
  } as unknown as Context;
};

export const createRouterContext = (options: RouterContextOptions): RouterContext => {
  const context = createContext<RouterContext>(options);

  context.router = options.router;

  return context;
};

export const createAppContext = (options: AppOptions = {}): AppContext => {
  const context = createContext<AppContext>(options);

  context.params = options.params;
  context.router = dummyRouter;

  return context;
};
