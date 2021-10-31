import { env } from "utils/env";

function getAppPath() {
  let currentDir = __dirname;
  currentDir = currentDir.replace("/config", "");
  return currentDir;
}

export const appConfig = {
  NODE_ENV: env("NODE_ENV") || "development",
  APP_PORT:
    Number(env("APP_PORT")) ||
    Number(env("NODE_PORT")) ||
    Number(env("PORT")) ||
    3000,
  IS_PRODUCTION: env("NODE_ENV") === "production",
  IS_STAGING: env("NODE_ENV") === "staging",
  IS_DEVELOPMENT: env("NODE_ENV") === "development",
  DOMAIN: env("DOMAIN"),
  SMTP: {
    auth: {
      pass: env("SMTP_PASSWORD") || "",
      user: env("SMTP_USERNAME") || "",
    },
    host: env("SMTP_HOST") || "",
    port: env("SMTP_PORT") || "",
    tls: {
      rejectUnauthorized: false,
    },
  },
  APP_NAME: env("APP_NAME"),
  APP_ROUTE_PREFIX: env("APP_ROUTE_PREFIX"),
  APP_URL: env("APP_URL"),
  APP_PATH: getAppPath(),
};
