/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { createLogger, transports, LoggerOptions, format } from 'winston';
import config from '../configs/config';

export class Logger {
  private static instance: Logger;
  private logger: ReturnType<typeof createLogger>;

  private constructor() {
    this.logger = createLogger(this.options);
  }

  private options: LoggerOptions = {
    format: Logger.getFormat(),
    transports: Logger.createTransport(),
  };

  static getLogger(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    this.logger.info(message, { label: labels, ...meta });
  };

  error = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    this.logger.error(message, { label: labels, ...meta });
  };

  warn = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    this.logger.warn(message, { label: labels, ...meta });
  };

  debug = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    this.logger.debug(message, { label: labels, ...meta });
  };

  static createTransport(labels?: any) {
    const customTransports = [];

    const applicationLogging = config().application_logging || false;

    // if (applicationLogging?.file) {
    //   customTransports.push(new transports.File({ filename: applicationLogging.file, level: applicationLogging.level, ...labels }));
    // }

    // if (applicationLogging?.console) {
    //   customTransports.push(new transports.Console({ level: applicationLogging.console, ...labels }));
    // }

    return customTransports;
  }

  private static getFormat() {
    const lokiFormat = format.printf(({ level, message, label, ...meta }) => {
      const logEntry = { timestamp: new Date(), level, message, label: { ...label }, ...meta };
      return JSON.stringify(logEntry);
    });
    return lokiFormat;
  }
}
