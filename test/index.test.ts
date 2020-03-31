import { OK } from 'http-status-codes';
import request from 'supertest';
import createApp from '../src/app';

describe('the application', (): void => {
  it.each(['/', '/some/path'])('should respond with 200 OK on %s', async (path: string): Promise<void> => {
    const response = await request(createApp().callback()).get(path);

    expect(response.status).toBe(OK);
  });
});
