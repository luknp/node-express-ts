import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import { appConfig } from "config/app";
import { createConnection, Connection } from "typeorm";
import { logger } from "config/logger";
import routes from "routes";

export class App {
  private server: Application = express();
  private port: Number = appConfig.APP_PORT;
  private dbConnection: Connection | null = null;

  public constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    try {
      this.useContainers();
      await this.typeOrmCreateConnection();
      this.configureServer();
      this.startServer();
      this.register404Page();
    } catch (err) {
      logger.error(err);
    }
  }

  private useContainers() {}

  private async typeOrmCreateConnection() {
    try {
      this.dbConnection = await createConnection();
    } catch (error) {
      console.log("Caught! Cannot connect to database: ", error);
    }
  }

  private register404Page() {
    this.server.get("*", function (req, res) {
      res.status(404).send({ status: 404, message: "Page Not Found!" });
    });
  }

  private configureServer() {
    this.server.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello world!");
    });
    this.server.use(routes);
  }

  private async startServer() {
    this.server.listen(this.port, () =>
      logger.info(
        `🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${appConfig.NODE_ENV}`
      )
    );

    this.server.on("close", () => {
      if (this.dbConnection) {
        this.dbConnection.close();
      }
      logger.info("node server closed");
    });
  }
}

new App();
