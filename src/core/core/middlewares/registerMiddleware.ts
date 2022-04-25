import Observers from "../../Observers";
import { RegisterMiddlewareFn } from "./protocols";

import KEYS from "../../constants/keys";

const registerMiddleware: RegisterMiddlewareFn = (callback) => {
  const middlewareObserver = {
    execute: callback,
  }

  Observers.subscribe(KEYS.MIDDLEWARES, middlewareObserver);
}

export default registerMiddleware;
