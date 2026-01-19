import type { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ROUTES } from "./routes/routes.js";

export function setupProxies(app: Express) {
  ROUTES.forEach((route) => {
    app.use(
      route.url,
      createProxyMiddleware({
        target: route.proxy.target,
        changeOrigin: true,
        pathRewrite: route.proxy.pathRewrite,
        onProxyRes: (proxyRes, req, res) => {
          if (!proxyRes.headers["access-control-allow-origin"]) {
            proxyRes.headers["access-control-allow-origin"] = "http://localhost:3000";
          }
          if (!proxyRes.headers["access-control-allow-credentials"]) {
            proxyRes.headers["access-control-allow-credentials"] = "true";
          }
        }
      })
    );
  });
}
