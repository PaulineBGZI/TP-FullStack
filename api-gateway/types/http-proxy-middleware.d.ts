import { IncomingMessage, ServerResponse } from 'http';

declare module 'http-proxy-middleware' {
  interface Options {
    onProxyRes?: (
      proxyRes: IncomingMessage,
      req: IncomingMessage,
      res: ServerResponse
    ) => void;
  }
}
