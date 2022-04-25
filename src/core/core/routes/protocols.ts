import { CallbackOptions } from "../../protocols";

import HttpMethods from "../../constants/httpMethods";

export type RouteCallback = (options: CallbackOptions) => void;

export type RegisterGenericRouteFn = (
  method: keyof typeof HttpMethods,
  path: string,
  callback: RouteCallback,
) => void;

export type RegisterRouteFn = (path: string, callback: RouteCallback) => void;

export interface RouteObserver {
  method: keyof typeof HttpMethods;
  path: string;
  execute: RouteCallback;
}
