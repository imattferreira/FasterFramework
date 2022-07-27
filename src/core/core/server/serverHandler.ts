import KEYS from '../../constants/keys';
import Observers from '../../Observers';
import callMiddlewares from '../middlewares/callMiddlewares';
import { MiddlewareObserver } from '../middlewares/protocols';
import makeRequest from '../request/makeRequest';
import { NestedRequest } from '../request/protocols';
import makeResponse from '../response/makeResponse';
import extractOptionalParams from '../routes/extractOptionalParams';
import matchRoute from '../routes/matchRoute';
import { RouteObserver } from '../routes/protocols';
import { ServerHandlerFn } from './protocols';

const serverHandler: ServerHandlerFn = async (httpRequest, httpResponse) => {
  const { url, method } = httpRequest as NestedRequest;
  const request = await makeRequest(httpRequest);
  const response = makeResponse(httpResponse);
  const metadata: Record<string, unknown> = {};

  const middlewares = Observers.getFromKey<MiddlewareObserver[]>(KEYS.MIDDLEWARES);
  const routes = Observers.getFromKey<RouteObserver[]>(KEYS.ROUTES);

  if (routes.length > 0 && url) {
    const routeMatched = routes.find((route) => matchRoute({ url, method, route }));

    if (routeMatched) {
      if (middlewares.length > 0) {
        callMiddlewares({
          middlewares, request, response, metadata,
        });
      }

      const optionalParams = extractOptionalParams(url, routeMatched.path);

      request.params = optionalParams;

      routeMatched.execute({ request, response, metadata });
      return;
    }

    response.json({ message: 'route not found' });
  }
};

export default serverHandler;
