import { CallMiddlewaresFn, CallNextMiddlewareFn } from "./protocols";

let position = 0;

const callMiddlewares: CallMiddlewaresFn = ({
  request,
  response,
  middlewares,
  metadata,
}) => {
  const callNextMiddleware: CallNextMiddlewareFn = (middleware) => {
    middleware?.execute?.({
      request,
      response,
      next: () => callNextMiddleware(middlewares && middlewares[position += 1]),
      metadata,
    });
  }

  callNextMiddleware(middlewares[position]);
}

export default callMiddlewares;
