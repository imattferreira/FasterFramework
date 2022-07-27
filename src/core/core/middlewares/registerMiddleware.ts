import KEYS from '../../constants/keys';
import Observers from '../../Observers';
import { RegisterMiddlewareFn } from './protocols';

const registerMiddleware: RegisterMiddlewareFn = (callback) => {
  const middlewareObserver = {
    execute: callback,
  };

  Observers.subscribe(KEYS.MIDDLEWARES, middlewareObserver);
};

export default registerMiddleware;
