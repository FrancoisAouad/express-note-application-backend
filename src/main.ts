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

const bootstrap = () => {
  const app = new ApplicationModule([new CategoryController(), new NoteController(), new UserController()]);
  app.listen();
  if (config().app.nodeEnv.toLowerCase() === 'development') {
    app.initSwaggerDocs();
  }
  const metrics = new MetricModule([new MetricController()]);
  metrics.startPrometheusServer();
};

bootstrap();
