import bodyParser from "../../utils/bodyParser";
import { MakeRequest, NestedRequest } from "./protocols";

const ALLOWED_METHODS_TO_SEND_BODY = ['POST', 'PUT', 'PATCH'];

const makeRequest: MakeRequest = async (request) => {
  const { url, method, headers } = request as NestedRequest;
  const params = {};
  let body = {};

  if (ALLOWED_METHODS_TO_SEND_BODY.includes(method)) {
    body = await bodyParser(request);
  }

  return {
    body,
    headers,
    params,
    url,
    method,
  };
}

export default makeRequest;
