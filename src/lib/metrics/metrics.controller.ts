/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Router } from 'express';
import { Controller } from '../../global/global.types';
import { MetricService } from './metrics.service';

export class MetricController extends Controller {
  private readonly metricService: MetricService;
  public constructor() {
    super();
    this.path = '/metrics';
    this.metricService = new MetricService();
    this.router = Router();
    this.initRoutes();
  }

  generateMetrics() {
    return this.metricService.generateMetrics();
  }

  initRoutes() {
    this.router.get(`${this.path}`, this.generateMetrics);
  }
}
