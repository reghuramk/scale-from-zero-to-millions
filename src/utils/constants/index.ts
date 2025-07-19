export const Constants = {
  ENVIRONMENT: {
    DEVELOPMENT: "DEVELOPMENT",
    PRODUCTION: "PRODUCTION",
  },
  FEMALE: "female",
  MALE: "male",
  MESSAGES: {
    ACCESS_TOKEN_SECRET_UNDEFINED: "ACCESS_TOKEN_SECRET is not defined",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    INVALID_TOKEN: "Invalid Token",
    REDIS_URL_UNDEFINED: "REDIS_URL environment variable is not defined",
    REFRESH_TOKEN_SECRET_UNDEFINED: "REFRESH_TOKEN_SECRET is not defined",
    ROUTE_NOT_FOUND: "Route not found",
    UNAUTHORISED: "Unauthorized",
    USER_INSERT_FAILED: "User insert failed",
  },
  OTHER: "other",
  ROUTES: {
    AUTH: {
      BASE: "/api/auth",
      LOGIN: "/login",
      REGISTER: "/register",
    },
    DASHBOARD: {
      BASE: "/api/dashboard",
      STATS: "/stats",
    },
  },
  TOKENS: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_tokem",
  },
};
