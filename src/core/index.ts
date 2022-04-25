import makeServer from "./core/server/makeServer";
import registerMiddleware from "./core/middlewares/registerMiddleware";
import router from './core/routes/registerRoute';

import HttpCodes from './constants/httpCodes';
import HttpMethods from "./constants/httpMethods";

const server = makeServer();

const listen = (port: number, callback: (port: number) => void) => {
  server.listen(port, () => callback(port));
}

export default {
  listen,
  middleware: registerMiddleware
};

export {
  router,
  HttpCodes,
  HttpMethods,
};
