import HttpMethods from '../../constants/httpMethods';
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

  const pathParams = route.path.split('/').filter(Boolean);
  const urlParams = url.split('/').filter(Boolean);

  if (pathParams.length !== urlParams.length) {
    return false;
  }

  const matchedParams = pathParams.every((param, index) => (
    param === urlParams[index] || (param.includes(':') && urlParams[index])
  ));

  return matchedParams;
};

export default matchRoute;
