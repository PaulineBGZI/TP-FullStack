import type { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ROUTES } from "./routes/routes.js";

export function setupProxies(app: Express) {
  ROUTES.forEach((route) => {
    // You can add authentication middleware here if needed: if (route.auth) { ... }
    app.use(route.url, createProxyMiddleware(route.proxy));
  });
}