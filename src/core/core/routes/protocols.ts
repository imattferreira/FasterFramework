import HttpMethods from '../../constants/httpMethods';
import { CallbackOptions } from '../../protocols';

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
