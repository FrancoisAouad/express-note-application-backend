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

/**
 * Logger is a singleton class that provides logging functionality using Winston logger.
 * It allows logging messages at different log levels like info, error, warn, and debug.
 * @class Logger
 */
export class Logger {
  private static instance: Logger;
  private logger: ReturnType<typeof createLogger>;

  /**
   * Creates an instance of Logger.
   * The constructor is private to enforce the singleton pattern.
   * @private
   * @constructor
   */
  private constructor() {
    this.logger = createLogger(this.options);
  }

  private options: LoggerOptions = {
    format: Logger.getFormat(),
    transports: Logger.createTransport(),
  };

  /**
   * Retrieves the instance of the Logger class.
   * If an instance already exists, it returns the existing instance, otherwise creates a new one.
   * @static
   * @function getLogger
   * @returns {Logger} The instance of the Logger class.
   */
  static getLogger(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Logs an info level message with the provided message, labels, and optional metadata.
   * @function info
   * @param {string} message - The log message.
   * @param {object} labels - Key-value pairs of labels for the log entry.
   * @param {any} meta - Optional metadata to be included in the log entry.
   */
  info = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    this.logger.info(message, { label: labels, ...meta });
  };

  /**
   * Logs an error level message with the provided message, labels, and optional metadata.
   * @function error
   * @param {string} message - The log message.
   * @param {object} labels - Key-value pairs of labels for the log entry.
   * @param {any} meta - Optional metadata to be included in the log entry.
   */
  error = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    this.logger.error(message, { label: labels, ...meta });
  };

  /**
   * Logs a warning level message with the provided message, labels, and optional metadata.
   * @function warn
   * @param {string} message - The log message.
   * @param {object} labels - Key-value pairs of labels for the log entry.
   * @param {any} meta - Optional metadata to be included in the log entry.
   */
  warn = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    this.logger.warn(message, { label: labels, ...meta });
  };

  /**
   * Logs a debug level message with the provided message, labels, and optional metadata.
   * @function debug
   * @param {string} message - The log message.
   * @param {object} labels - Key-value pairs of labels for the log entry.
   * @param {any} meta - Optional metadata to be included in the log entry.
   */
  debug = (message: string, labels: { [key: string]: string }, meta?: any): void => {
    this.logger.debug(message, { label: labels, ...meta });
  };

  /**
   * Creates custom transports for logging based on the application configuration.
   * @static
   * @function createTransport
   * @param {any} labels - Optional labels to be included in the custom transports.
   * @returns {transports.Transport[]} An array of custom transports for logging.
   */
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

  /**
   * Returns a custom log format for loki.
   * @static
   * @function getFormat
   * @returns {format.printf} A custom log format function for Winston logger.
   */
  private static getFormat() {
    const lokiFormat = format.printf(({ level, message, label, ...meta }) => {
      const logEntry = { timestamp: new Date(), level, message, label: { ...label }, ...meta };
      return JSON.stringify(logEntry);
    });
    return lokiFormat;
  }
}
