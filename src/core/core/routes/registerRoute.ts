import KEYS from '../../constants/keys';
import Observers from '../../Observers';
import { RegisterGenericRouteFn, RegisterRouteFn, RouteObserver } from './protocols';

const registerRoute: RegisterGenericRouteFn = (method, path, callback) => {
  const route: RouteObserver = {
    path,
    method,
    execute: callback,
  };

  Observers.subscribe<RouteObserver>(KEYS.ROUTES, route);
};

const get: RegisterRouteFn = (path, callback) => registerRoute('GET', path, callback);

const post: RegisterRouteFn = (path, callback) => registerRoute('POST', path, callback);

const patch: RegisterRouteFn = (path, callback) => registerRoute('PATCH', path, callback);

const put: RegisterRouteFn = (path, callback) => registerRoute('PUT', path, callback);

const del: RegisterRouteFn = (path, callback) => registerRoute('DELETE', path, callback);

const route = Object.freeze({
  get,
  post,
  patch,
  put,
  del,
});

export default route;
