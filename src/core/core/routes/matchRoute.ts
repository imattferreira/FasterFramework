import HttpMethods from '../../constants/httpMethods';
import { isParamTemplate, sanitizeParams } from '../../utils';
import { RouteObserver } from './protocols';

interface MatchRouteOptions {
  url: string;
  method: keyof typeof HttpMethods;
  route: RouteObserver;
}

type MatchRouteFn = ({ url, method, route }: MatchRouteOptions) => boolean;

const matchRoute: MatchRouteFn = ({ url, method, route }) => {
  if (route.method !== method) {
    return false;
  }

  if (route.path === url) {
    return true;
  }

  const pathParams = sanitizeParams(route.path);
  const urlParams = sanitizeParams(url);

  if (pathParams.length !== urlParams.length) {
    return false;
  }

  const matchedParams = pathParams.every((param, index) => (
    param === urlParams[index] || (isParamTemplate(param) && urlParams[index])
  ));

  return matchedParams;
};

export default matchRoute;
