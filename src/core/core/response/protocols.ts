import { ServerResponse } from 'http';

import HttpCodes from '../../constants/httpCodes';

export interface HttpResponse {
  status: (statusCode: HttpCodes) => Omit<HttpResponse, 'status'>;
  json: (data: Record<string, unknown>) => Omit<HttpResponse, 'json'>;
}

export type MakeResponse = (response: ServerResponse) => HttpResponse;
