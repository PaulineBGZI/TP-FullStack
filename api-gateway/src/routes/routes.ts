const USER_HOST = process.env.USER_HOST || 'localhost';
const COMMAND_HOST = process.env.USER_HOST || 'localhost';

export const ROUTES = [
  {
    url: "/users",
    auth: true,
    rateLimit: { windowMs: 15 * 60 * 1000, max: 100 },
    proxy: {
      target: `http:${USER_HOST}:5001`, // user-service
      changeOrigin: true,
      pathRewrite: { "^/users": "" },
    },
  },
  {
    url: "/commands",
    auth: true,
    proxy: {
      target: `http:${COMMAND_HOST}:5002`, // commands-service
      changeOrigin: true,
      pathRewrite: { "^/cv": "" },
    },
  },
];