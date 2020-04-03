import { renderToString, TemplateResult } from '@popeindustries/lit-html-server';
import { ExtendableContext, Next } from 'koa';
import { Middleware } from 'koa-compose';

export default (): Middleware<ExtendableContext> => (
  async ({ response }: ExtendableContext, next: Next): Promise<void> => {
    await next();

    if (!(response.body instanceof TemplateResult)) {
      return;
    }

    response.body = await renderToString(response.body);
    response.type = 'html';
  }
);
