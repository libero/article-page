import { promises as fs } from 'fs';

describe('the application', (): void => {
  it('should exist', async (): Promise<void> => {
    await expect(fs.access(`${__dirname}/../src/index.ts`)).resolves.not.toThrow();
  });
});
