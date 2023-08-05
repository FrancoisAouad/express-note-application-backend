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

export class ApplicationModule {
  private app: Application;
  private readonly logger: Logger;
  private readonly httpExceptionFilter: HttpExceptionFilter;

  public constructor(controllers: Controller[]) {
    this.app = express();
    this.logger = Logger.getLogger();
    this.httpExceptionFilter = new HttpExceptionFilter();
    this.initMiddlewares();
    this.initControllers(controllers);
    this.initExceptionFilter();
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

  initExceptionFilter() {
    this.app.use(this.httpExceptionFilter.exceptionMiddleware);
    this.app.use(this.httpExceptionFilter.catch);
  }

  initSwaggerDocs() {
    return;
  }

  initPrometheus() {
    return;
  }
}
