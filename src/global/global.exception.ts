/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Exception, Message } from './global.types';

/**
 * HttpException represents a custom HTTP exception with status, error code, and error message.
 * It extends the Error class to handle and throw custom exceptions.
 * @class HttpException
 * @extends Error
 */
export class HttpException extends Error {
  /**
   * The HTTP status code for the exception.
   * @property {number} status
   */
  public status: number;

  /**
   * The unique error code for the exception.
   * @property {string} errorCode
   */
  public errorCode: string;

  /**
   * The error message object containing messages in different languages.
   * @property {Message} errorMessage
   */
  public errorMessage: Message;

  /**
   * Creates an instance of HttpException with the provided parameters.
   * @constructor
   * @param {Exception} params - The parameters to construct the HttpException instance.
   */
  public constructor(params: Exception) {
    super();

    /**
     * The HTTP status code for the exception.
     * @property {number} status
     */
    this.status = params.status;

    /**
     * The unique error code for the exception.
     * @property {string} errorCode
     */
    this.errorCode = params.errorCode;

    /**
     * The error message object containing messages in different languages.
     * @property {Message} errorMessage
     */
    this.errorMessage = params.errorMessage;
  }
}
