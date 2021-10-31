import { env } from "utils/env";

function getAppPath() {
  let currentDir = __dirname;
  currentDir = currentDir.replace("/config", "");
  return currentDir;
}

export const appConfig = {
  node: env("NODE_ENV") || "development",
  port: Number(env("APP_PORT")) || 4000,
  isProduction: env("NODE_ENV") === "production",
  isStaging: env("NODE_ENV") === "staging",
  isDevelopment: env("NODE_ENV") === "development",
  name: env("APP_NAME"),
  routePrefix: env("APP_ROUTE_PREFIX"),
  url: env("APP_URL"),
  appPath: getAppPath(),
};
