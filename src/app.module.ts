/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import config from './configs/config';
import corsConfig from './configs/cors.config';
import { HttpExceptionFilter } from '../src/global/exception-filter';
import { Logger } from './global/logger';
import { Controller } from './global/global.types.js';
dotenv.config();

/**
 * ApplicationModule is a class that configures and initializes the application.
 * It sets up middlewares, controllers, and exception filters for the application.
 * @class ApplicationModule
 */
export class ApplicationModule {
  /**
   * The Express Application instance for the application.
   * @private
   * @property {Application} app
   */
  private app: Application;

  /**
   * The Logger instance for logging application-related messages.
   * @private
   * @property {Logger} logger
   */
  private readonly logger: Logger;

  /**
   * The HttpExceptionFilter instance for handling HTTP exceptions.
   * @private
   * @property {HttpExceptionFilter} httpExceptionFilter
   */
  private readonly httpExceptionFilter: HttpExceptionFilter;

  /**
   * Creates an instance of ApplicationModule.
   * The constructor initializes the Express application and sets up the logger and HTTP exception filter.
   * @constructor
   * @param {Controller[]} controllers - An array of controller instances to be registered in the application.
   */
  public constructor(controllers: Controller[]) {
    /**
     * The Express Application instance for the application.
     * @private
     * @property {Application} app
     */
    this.app = express();

    /**
     * The Logger instance for logging application-related messages.
     * @private
     * @property {Logger} logger
     */
    this.logger = Logger.getLogger();

    /**
     * The HttpExceptionFilter instance for handling HTTP exceptions.
     * @private
     * @property {HttpExceptionFilter} httpExceptionFilter
     */
    this.httpExceptionFilter = new HttpExceptionFilter();

    /**
     * Initializes application middlewares.
     * @function initMiddlewares
     */
    this.initMiddlewares();

    /**
     * Initializes application controllers.
     * @function initControllers
     * @param {Controller[]} controllers - An array of controller instances to be registered in the application.
     */
    this.initControllers(controllers);

    /**
     * Initializes the HTTP exception filter.
     * @function initExceptionFilter
     */
    this.initExceptionFilter();
  }

  /**
   * Starts the server and listens on the specified port.
   * @function listen
   */
  listen = () => {
    this.app.listen(config().app.port, () => {
      this.logger.info(`Server running on port ${config().app.port}`, { system: 'app' });
    });
  };

  /**
   * Initializes application middlewares, including CORS, JSON parsing, and URL-encoded parsing.
   * @function initMiddlewares
   */
  initMiddlewares = () => {
    this.app.use(cors(corsConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  /**
   * Initializes application controllers and registers them under the '/api' route.
   * @function initControllers
   * @param {Controller[]} controllers - An array of controller instances to be registered in the application.
   */
  initControllers = (controllers: Controller[]) => {
    controllers.forEach((controller: Controller) => {
      this.app.use('/api', controller.router);
    });
  };

  /**
   * Initializes the HTTP exception filter for handling exceptions in the application.
   * @function initExceptionFilter
   */
  initExceptionFilter = () => {
    this.app.use(this.httpExceptionFilter.exceptionMiddleware);
    this.app.use(this.httpExceptionFilter.catch);
  };

  /**
   * Initializes Swagger documentation for the application (to be implemented).
   * @function initSwaggerDocs
   */
  initSwaggerDocs = () => {
    // To be implemented
    return;
  };
}
