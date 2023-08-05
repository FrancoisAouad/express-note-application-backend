/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { HttpException } from './global.exception';
import { Router } from 'express';

export type LogMessageOptions = {
  responseTime: number;
  body?: object;
  error?: HttpException;
};

export type Exception = {
  status: number;
  errorCode: string;
  errorMessage: { en: string; ar: string; fr: string };
};

export type Message = {
  en: string;
  ar: string;
  fr: string;
};

export abstract class Controller {
  public path: string;
  public router: Router;

  constructor() {
    this.router = Router();
    this.path = '';
    this.initRoutes();
  }

  abstract initRoutes(): void;
}
