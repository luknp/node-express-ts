import "reflect-metadata";
import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import createServer from "server";
import { createConnection } from "typeorm";

const startServer = async () => {
  const dbConn = await createConnection();
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 4000;
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
