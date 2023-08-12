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

/**
 * LogMessageOptions represents options for logging a message.
 * @interface LogMessageOptions
 */
export type LogMessageOptions = {
  responseTime: number;
  body?: object;
  error?: HttpException;
};

/**
 * Exception represents the parameters to construct an HttpException instance.
 * @interface Exception
 */
export type Exception = {
  status: number;
  errorCode: string;
  errorMessage: Message;
};

/**
 * Message represents an object containing error messages in different languages.
 * @interface Message
 */
export type Message = {
  en: string;
  ar: string;
  fr: string;
};

/**
 * Controller is an abstract class that defines the basic structure of a controller.
 * It is meant to be extended by concrete controller classes to implement specific routes and logic.
 * @abstract
 * @class Controller
 */
export abstract class Controller {
  /**
   * The base path for the controller's routes.
   * @property {string} path
   */
  public path: string;

  /**
   * The Express router instance for the controller.
   * @property {Router} router
   */
  public router: Router;

  /**
   * Creates an instance of Controller.
   * @constructor
   */
  constructor() {
    /**
     * The Express router instance for the controller.
     * @property {Router} router
     */
    this.router = Router();

    /**
     * The base path for the controller's routes.
     * @property {string} path
     */
    this.path = '';

    /**
     * Initializes the routes for the controller.
     * This method should be implemented by concrete controller classes to define their specific routes.
     * @abstract
     * @function initRoutes
     */
    this.initRoutes();
  }

  /**
   * Initializes the routes for the controller.
   * This method should be implemented by concrete controller classes to define their specific routes.
   * @abstract
   * @function initRoutes
   */
  abstract initRoutes(): void;

  /**
   * Initializes the method bindings to ensure the correct context.
   * This method should be implemented by concrete controller classes to bind their methods to the correct context.
   * @abstract
   * @function initBindings
   */
  abstract initBindings(): void;
}

export type AxiosHttpOptions = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type AxiosHeaderOptions = { header: string; value: string };
