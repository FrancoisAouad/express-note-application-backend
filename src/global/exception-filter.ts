/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { NextFunction, Request, Response } from 'express';
import { HttpException } from './global.exception';
import { Logger } from './logger';

export class HttpExceptionFilter {
  private logger: Logger;
  public constructor() {
    this.logger = Logger.getLogger();
  }

  exceptionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next(
      new HttpException({
        errorCode: 'NOT_FOUND',
        status: 404,
        errorMessage: { en: 'Not Found', ar: 'Not Found AR', fr: 'Not Found FR' },
      }),
    );
  };

  catch = (err: HttpException | Error, req: Request, res: Response, next: NextFunction) => {
    let status = 500;
    let message: string | string[] = 'Unknown error';

    const path = req.path;
    const timestamp = new Date().toISOString();
    const lang = req.headers['accept-language'] || 'en';

    if (err instanceof HttpException) {
      status = err.status;
      message = err.errorMessage[lang];
    } else if (err instanceof Error) {
      status = 400;
      message = [err.message];
    }

    this.logger.error(`Failed to handle Request: ${path} Status: ${status}`, { interceptor: 'filter' }, { err });
    res.status(status);
    res.send({ success: false, statusCode: status, timestamp, path, message: [message] });
  };
}
