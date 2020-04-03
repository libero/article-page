import { html } from '@popeindustries/lit-html-server';
import { Next } from 'koa';
import { AppContext, AppMiddleware } from '../app';

export default (): AppMiddleware => (
  async ({ params: { id }, response }: AppContext, next: Next): Promise<void> => {
    const title = `Article ${id}`;

    response.body = html`
      <!doctype html>
      <title>${title}</title>
      <h1>${title}</h1>
    `;

    await next();
  }
);
