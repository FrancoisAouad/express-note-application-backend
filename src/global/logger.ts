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

  private static createTransport(labels?: any) {
    const customTransports = [];

    // if (config().application_logging.file) {
    //   customTransports.push(
    //     new transports.File({ filename: config().application_logging.file, level: config().application_logging.level, ...labels }),
    //   );
    // }

    // if (config().application_logging.console) {
    // customTransports.push(new transports.Console({ level: true, ...labels }));
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
