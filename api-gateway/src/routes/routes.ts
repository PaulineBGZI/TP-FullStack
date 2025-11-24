export const ROUTES = [
  {
    url: "/users",
    auth: true,
    rateLimit: { windowMs: 15 * 60 * 1000, max: 100 }, // Not enforced, just for config
    proxy: {
      target: "http://localhost:5001", // user-service
      changeOrigin: true,
      pathRewrite: { "^/users": "" },
    },
  },
  {
    url: "/cv",
    auth: true,
    proxy: {
      target: "http://localhost:5002", // cv-service
      changeOrigin: true,
      pathRewrite: { "^/cv": "" },
    },
  },
  // Add more routes as needed
];