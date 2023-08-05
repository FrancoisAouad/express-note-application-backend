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
import config from '../../configs/config';
import { Logger } from '../../global/logger';

/**
 * MetricModule is a module class that handles metrics-related functionality.
 * It is responsible for initializing controllers and starting the Prometheus metrics server.
 * @class MetricModule
 */
export class MetricModule {
  /**
   * The Express Application instance for the metrics module.
   * @property {Application} app
   */
  public app: Application;

  /**
   * The Logger instance for logging metrics-related messages.
   * @private
   * @property {Logger} logger
   */
  private readonly logger: Logger;

  /**
   * Creates an instance of MetricModule.
   * @constructor
   * @param {any} controllers - An array of controllers to be initialized by the metric module.
   */
  public constructor(controllers: any) {
    /**
     * The Express Application instance for the metrics module.
     * @property {Application} app
     */
    this.app = express();

    /**
     * The Logger instance for logging metrics-related messages.
     * @private
     * @property {Logger} logger
     */
    this.logger = Logger.getLogger();

    /**
     * Initializes controllers and sets up the Express app.
     * @function initializeControllers
     * @param {any} controllers - An array of controllers to be initialized by the metric module.
     */
    this.initializeControllers(controllers);
  }

  /**
   * Starts the Prometheus metrics server and listens on the specified port.
   * @function startPrometheusServer
   */
  startPrometheusServer = () => {
    this.app.listen(config().prometheus.port, () => {
      this.logger.info(`Prometheus metrics server running on port ${config().prometheus.port}`, { system: 'metrics' });
    });
  };

  /**
   * Initializes controllers by adding their routers to the Express app.
   * @function initializeControllers
   * @param {any} controllers - An array of controllers to be initialized by the metric module.
   */
  initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use(controller.router);
    });
  }
}
