import makeRequest from '../request/makeRequest';
import makeResponse from '../response/makeResponse';
import Observers from '../../Observers';
import { MiddlewareObserver } from '../middlewares/protocols';
import matchRoute from '../routes/matchRoute';
import { RouteObserver } from '../routes/protocols';
import { NestedRequest } from '../request/protocols';
import { ServerHandlerFn } from './protocols';
import callMiddlewares from '../middlewares/callMiddlewares';
import extractOptionalParams from '../routes/extractOptionalParams';

import KEYS from '../../constants/keys';

const serverHandler: ServerHandlerFn = async (httpRequest, httpResponse) => {
  const { url, method } = httpRequest as NestedRequest;
  const request = await makeRequest(httpRequest);
  const response = makeResponse(httpResponse);
  let metadata: Record<string, unknown> = {};

  const middlewares = Observers.getFromKey<MiddlewareObserver[]>(KEYS.MIDDLEWARES);
  const routes = Observers.getFromKey<RouteObserver[]>(KEYS.ROUTES);

  if (routes.length > 0 && url) {
    const routeMatched = routes.find(route => matchRoute({ url, method, route }));

    if (routeMatched) {
      if (middlewares.length > 0) {
        callMiddlewares({ middlewares, request, response, metadata });
      }

      const optionalParams = extractOptionalParams(url, routeMatched.path);

      request.params = optionalParams;

      routeMatched.execute({ request, response, metadata });
      return;
    }

    response.json({ message: 'route not found' });
  }
}

export default serverHandler;
