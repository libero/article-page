import createApp from './app';
import createRouter from './router';

const router = createRouter();

const app = createApp(router);

app.listen(8080);
