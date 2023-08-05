import express, { Application } from 'express';
import cors from 'cors';
import config from './configs/config';
import corsConfig from './configs/cors.config';
import * as dotenv from 'dotenv';
// import { errorHandler, sendError } from '../src/global/exception-filter';
import { Logger } from './global/logger';
import { Controller } from './global/global.types.js';
dotenv.config();

export class ApplicationModule {
  private app: Application;
  private readonly logger: Logger;

  public constructor(controllers: Controller[]) {
    this.app = express();
    this.logger = Logger.getLogger();
    this.initMiddlewares();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  listen() {
    this.app.listen(config().app.port, () => {
      this.logger.info(`Server running on port ${config().app.port}`, { system: 'app' });
    });
  }

  initMiddlewares() {
    this.app.use(cors(corsConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use('/api', controller.router);
    });
  }

  initErrorHandling() {
    // this.app.use(sendError);
    // this.app.use(errorHandler);
  }

  initSwaggerDocs() {
    return;
  }

  initPrometheus() {
    return;
  }
}
