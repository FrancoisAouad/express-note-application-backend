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

export class MetricService {
  public constructor() {
    collectDefaultMetrics();
    this.generateMetrics();
  }

  generateMetrics = async () => {
    const result = await register.metrics();
    return result;
  };

  static registerCustomMetrics = () => {
    register.registerMetric(databaseResponseTimeHistogram);
    register.registerMetric(getRestResponseTimeHistogram);
  };
}
