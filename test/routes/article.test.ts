import { renderToBuffer, TemplateResult } from '@popeindustries/lit-html-server';
import '@testing-library/jest-dom';
import { OK } from 'http-status-codes';
import { JSDOM } from 'jsdom';
import { Response } from 'koa';
import article from '../../src/routes/article';
import { createAppContext } from '../context';
import runMiddleware, { NextMiddleware } from '../middleware';

const makeRequest = async (
  id: string, next?: NextMiddleware,
): Promise<Response> => (
  runMiddleware(article(), createAppContext({ params: { id } }), next)
);

describe('article', (): void => {
  it('should return a successful response', async (): Promise<void> => {
    const response = await makeRequest('my-article');

    expect(response.status).toBe(OK);
  });

  it('should return the article', async (): Promise<void> => {
    const response = await makeRequest('my-article');

    expect(response.body).toBeInstanceOf(TemplateResult);

    const { window: { document } } = new JSDOM(await renderToBuffer(response.body));

    expect(document.querySelector('title')).toHaveTextContent('Article my-article');
    expect(document.querySelector('h1')).toHaveTextContent('Article my-article');
  });

  it('should call the next middleware', async (): Promise<void> => {
    const next = jest.fn();

    await makeRequest('my-article', next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
