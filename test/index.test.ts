import { NOT_FOUND, OK } from 'http-status-codes';
import request from 'supertest';
import createApp, { App } from '../src/app';
import createRouter from '../src/router';

const router = createRouter();
let app: App;

beforeEach((): void => {
  app = createApp(router);
});

describe('the application', (): void => {
  it('should respond with 200 OK on an article page', async (): Promise<void> => {
    const response = await request(app.callback()).get('/my-article');

    expect(response.status).toBe(OK);
  });

  it('should respond with 404 Not Found on an unknown path', async (): Promise<void> => {
    const response = await request(app.callback()).get('/does/not/exist');

    expect(response.status).toBe(NOT_FOUND);
  });
});
