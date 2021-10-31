import { env } from "utils/env";

export = {
  type: env("RDS_TYPE"),
  host: env("RDS_HOST"),
  port: env("RDS_PORT"),
  username: env("RDS_USERNAME"),
  password: env("RDS_PASSWORD"),
  database: env("RDS_DB_NAME"),
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts", "./src/entity/**/*.js"],
  migrations: ["src/migration/**/*.ts", "./migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.ts", "./subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
