import { IncomingMessage, Server, ServerResponse } from "http";

export type makeServerFn = () => Server;

export type ServerHandlerFn = (
  httpRequest: IncomingMessage,
  httpResponse: ServerResponse,
) => void;
