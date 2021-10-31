import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import { appConfig } from "config/app";
import { createConnection } from "typeorm";
import routes from "routes";

export class App {
  private app: Application = express();
  private port: Number = appConfig.port;

  public constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    this.useContainers();
    await this.typeOrmCreateConnection();
    this.configureServer();
    this.startServer();
    this.register404Page();
  }

  private useContainers() {}

  private async typeOrmCreateConnection() {
    try {
      await createConnection();
    } catch (error) {
      console.log("Caught! Cannot connect to database: ", error);
    }
  }

  private register404Page() {
    this.app.get("*", function (req, res) {
      res.status(404).send({ status: 404, message: "Page Not Found!" });
    });
  }

  private configureServer() {
    this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello world!");
    });
    this.app.use(routes);
  }

  private async startServer() {
    this.app.listen(this.port, () =>
      console.log(
        `🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${appConfig.node}`
      )
    );
  }
}

new App();
