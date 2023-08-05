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

export class MetricModule {
  public app: Application;
  private readonly logger: Logger;
  public constructor(controllers: any) {
    this.app = express();
    this.logger = Logger.getLogger();
    this.initializeControllers(controllers);
  }

  startPrometheusServer = () => {
    this.app.listen(config().prometheus.port, () => {
      this.logger.info(`Prometheus metrics server running on port ${config().prometheus.port}`, { system: 'metrics' });
    });
  };

  initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use(controller.router);
    });
  }
}
