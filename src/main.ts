/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import * as dotenv from 'dotenv';
dotenv.config();
import { CategoryController } from './categories/categories.controller';
import { NoteController } from './notes/notes.controller';
import { UserController } from './users/users.controller';
import { ApplicationModule } from './app.module';
import { MetricModule } from './lib/metrics/metrics.module';
import { MetricController } from './lib/metrics/metrics.controller';
import config from './configs/config';

/**
 * Initializes and starts the application and metrics modules.
 *
 * The `bootstrap` function creates instances of ApplicationModule and MetricModule,
 * registers controllers, and starts the necessary servers. It also provides an option
 * to initialize Swagger documentation when the application is running in development mode.
 *
 * @function bootstrap
 * @returns {void}
 * @throws {Error} - If the configuration for the app node environment is missing or invalid.
 */
const bootstrap = (): void => {
  /* Initialize and start the application module */
  const app = new ApplicationModule([new CategoryController(), new NoteController(), new UserController()]);

  /* Start the application server */
  app.listen();

  /* Initialize Swagger documentation for API endpoints */
  if (config().app.nodeEnv.toLowerCase() === 'development') {
    app.initSwaggerDocs();
  }

  /* Initialize and start the metrics module */
  const metrics = new MetricModule([new MetricController()]);
  metrics.startPrometheusServer();
};

/* Start the application and metrics modules */
bootstrap();
