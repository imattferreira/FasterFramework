import { CallbackOptions } from '../../protocols';
import { HttpRequest } from '../request/protocols';
import { HttpResponse } from '../response/protocols';

interface MiddlewareCallbackOptions extends CallbackOptions {
  next: () => void;
}

export type MiddlewareCallback = (options: MiddlewareCallbackOptions) => void;

export type RegisterMiddlewareFn = (callback: MiddlewareCallback) => void;

export interface MiddlewareObserver {
  execute: MiddlewareCallback;
}

interface CallMiddlewaresOptions {
  request: HttpRequest;
  response: HttpResponse;
  middlewares: MiddlewareObserver[];
  metadata: Record<string, unknown>;
}
export type CallMiddlewaresFn = (options: CallMiddlewaresOptions) => void;

export type CallNextMiddlewareFn = (middleware: MiddlewareObserver) => void;
