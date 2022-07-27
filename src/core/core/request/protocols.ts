import { IncomingHttpHeaders, IncomingMessage } from 'http';

import HttpMethods from '../../constants/httpMethods';

type HttpHeaders = IncomingHttpHeaders;

export interface HttpRequest {
  url: string;
  method: keyof typeof HttpMethods;
  body: Record<string, unknown>;
  params: Record<string, unknown>;
  headers: HttpHeaders;
}

export type MakeRequest = (request: IncomingMessage) => Promise<HttpRequest>;

export interface NestedRequest extends IncomingMessage {
  url: string;
  method: HttpMethods;
  body: Record<string, unknown>;
}
