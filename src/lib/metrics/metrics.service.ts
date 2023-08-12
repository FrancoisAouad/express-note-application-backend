/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { collectDefaultMetrics, register } from 'prom-client';
import { databaseResponseTimeHistogram, getRestResponseTimeHistogram } from './metrics.config';

/**
 * MetricService is a service class that handles metrics-related operations.
 * It registers default metrics and provides a method to generate metrics.
 * @class MetricService
 */
export class MetricService {
  /**
   * Creates an instance of MetricService.
   * The constructor registers default metrics and generates metrics upon initialization.
   * @constructor
   */
  public constructor() {
    /**
     * Registers default metrics provided by the prom-client library.
     * @function collectDefaultMetrics
     */
    collectDefaultMetrics();

    /**
     * Generates metrics and returns the result.
     * @function generateMetrics
     * @async
     * @returns {Promise<string>} A Promise that resolves with the generated metrics as a string.
     */
    this.generateMetrics();
  }

  /**
   * Generates metrics using the prom-client library and returns the result.
   * @function generateMetrics
   * @async
   * @returns {Promise<string>} A Promise that resolves with the generated metrics as a string.
   */
  public async generateMetrics() {
    const result = await register.metrics();
    return result;
  }

  /**
   * Registers custom metrics (histograms) for database response time and REST API response time.
   * @static
   * @function registerCustomMetrics
   */
  private static registerCustomMetrics() {
    /**
     * Registers a custom histogram metric for database response time.
     * @property {Histogram} databaseResponseTimeHistogram
     */
    register.registerMetric(databaseResponseTimeHistogram);

    /**
     * Registers a custom histogram metric for REST API response time.
     * @property {Histogram} getRestResponseTimeHistogram
     */
    register.registerMetric(getRestResponseTimeHistogram);
  }
}
