import { HttpRequest } from "./core/request/protocols";
import { HttpResponse } from "./core/response/protocols";

export interface CallbackOptions {
  request: HttpRequest;
  response: HttpResponse;
  metadata: Record<string, unknown>;
}
