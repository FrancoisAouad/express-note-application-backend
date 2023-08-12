/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

export default () => {
  const {
    NODE_ENV = 'development',
    APP_PORT = '5021',
    APP_NAME = 'note-app',
    DB_HOST = 'localhost',
    DB_PORT = 27017,
    DB_USER = '',
    DB_PASSWORD = '',
    DB_NAME = 'note-app',
    LOG_LEVEL = 'info',
    LOG_ENABLE_CONSOLE = true,
    LOG_FILE = false,
    METRICS_PORT = 8021,
    NODEMAILER_USER = '',
    NODEMAILER_PASS = '',
  } = process.env;

  const isConsoleEnabled = LOG_ENABLE_CONSOLE !== 'true';

  return {
    app: {
      nodeEnv: NODE_ENV,
      port: APP_PORT,
      name: APP_NAME,
    },
    mongo: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    application_logging: {
      level: LOG_LEVEL,
      console: isConsoleEnabled,
      file: LOG_FILE,
    },
    prometheus: {
      port: METRICS_PORT,
    },
    nodemailer: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  };
};
