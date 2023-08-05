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

export class MetricModule {
  public app: Application;
  constructor(controllers: any) {
    this.app = express();
    this.initializeControllers(controllers);
  }
  startPrometheusServer = () => {
    this.app.listen(config().prometheus.port, () => {
      console.log(`Prometheus metrics server running on port ${config().prometheus.port}`);
    });
  };
  initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use(controller.router);
    });
  }
}
