/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { NextFunction, Router, Response } from 'express';
import { Controller } from '../../global/global.types';
import { MetricService } from './metrics.service';

/**
 * MetricController is a controller class that handles metric-related routes.
 * It extends the base Controller class to define specific routes and their logic.
 * @class MetricController
 * @extends Controller
 */
export class MetricController extends Controller {
  /**
   * The MetricService instance to handle metric-related operations.
   * @private
   * @property {MetricService} metricService
   */
  private readonly metricService: MetricService;

  /**
   * Creates an instance of MetricController.
   * @constructor
   */
  public constructor() {
    super();

    /**
     * The base path for metric-related routes.
     * @property {string} path
     */
    this.path = '/metrics';

    /**
     * The Express router instance for metric-related routes.
     * @property {Router} router
     */
    this.router = Router();

    /**
     * The MetricService instance to handle metric-related operations.
     * @property {MetricService} metricService
     */
    this.metricService = new MetricService();

    /**
     * Initializes method bindings to ensure the correct context.
     * @function initBindings
     */
    this.initBindings();

    /**
     * Initializes metric-related routes.
     * @function initRoutes
     */
    this.initRoutes();
  }

  /**
   * Generates metrics and sends the result in the response.
   * @async
   * @function generateMetrics
   * @param {any} req - The Express Request object.
   * @param {Response} res - The Express Response object.
   * @param {NextFunction} next - The NextFunction to handle the next middleware.
   * @returns {Promise<void>} A Promise that resolves when metrics are generated and sent in the response.
   */
  private async generateMetrics(req: any, res: Response, next: NextFunction) {
    try {
      const result = await this.metricService.generateMetrics();
      res.status(200).send(result);
    } catch (e: any) {
      next(e);
    }
  }

  /**
   * Initializes metric-related routes by defining the 'generateMetrics' route.
   * The 'generateMetrics' route handles GET requests to retrieve metrics.
   * @function initRoutes
   */
  public initRoutes() {
    this.router.get(`${this.path}`, this.generateMetrics);
  }

  /**
   * Initializes method bindings to ensure the correct context.
   * This method binds the 'generateMetrics' method to the correct context (this).
   * @function initBindings
   */
  public initBindings = () => {
    this.generateMetrics = this.generateMetrics.bind(this);
  };
}
