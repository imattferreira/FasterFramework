import HttpCodes from './constants/httpCodes';
import HttpMethods from './constants/httpMethods';
import registerMiddleware from './core/middlewares/registerMiddleware';
import router from './core/routes/registerRoute';
import makeServer from './core/server/makeServer';

const server = makeServer();

const listen = (port: number, callback: (serverPort: number) => void) => {
  server.listen(port, () => callback(port));
};

export default Object.freeze({
  listen,
  middleware: registerMiddleware,
});

export {
  HttpCodes,
  HttpMethods,
  router,
};
