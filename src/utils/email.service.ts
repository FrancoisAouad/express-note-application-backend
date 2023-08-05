/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Transporter, createTransport, SendMailOptions } from 'nodemailer';
import { NodemailerService } from '../configs/enum';
import { Logger } from '../global/logger';
import config from '../configs/config';
import { HttpException } from '../global/global.exception';

/**
 * EmailService is a service class that handles sending emails using Nodemailer.
 * It initializes a Nodemailer transporter with configuration settings.
 * @class EmailService
 */
export class EmailService {
  /**
   * The Nodemailer Transporter instance for sending emails.
   * @private
   * @property {Transporter} transporter
   */
  private readonly transporter: Transporter;

  /**
   * The Logger instance for logging email-related messages.
   * @private
   * @property {Logger} logger
   */
  private readonly logger: Logger;

  /**
   * Creates an instance of EmailService.
   * The constructor initializes the Nodemailer transporter with the provided configuration settings.
   * @constructor
   */
  public constructor() {
    /**
     * The Nodemailer Transporter instance for sending emails.
     * @private
     * @property {Transporter} transporter
     */
    this.transporter = createTransport({
      service: NodemailerService.GMAIL,
      auth: { user: config().nodemailer.user, pass: config().nodemailer.pass },
    });

    /**
     * The Logger instance for logging email-related messages.
     * @private
     * @property {Logger} logger
     */
    this.logger = Logger.getLogger();
  }

  /**
   * Sends an email using the Nodemailer transporter.
   * @async
   * @function sendMail
   * @param {SendMailOptions} mailOptions - The options for the email to be sent.
   * @throws {HttpException} If there is an error sending the email, an HttpException is thrown with status 500 and errorCode 'UNEXPECTED_ERROR'.
   * @returns {Promise<void>} A Promise that resolves when the email is sent successfully.
   */
  async sendMail(mailOptions: SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.warn(`Failed to send email with options: ${JSON.stringify(mailOptions)}`, { system: 'email' });
      throw new HttpException({
        status: 500,
        errorCode: 'UNEXPECTED_ERROR',
        errorMessage: { ar: 'ar', en: 'en', fr: 'fr' },
      });
    }
  }
}
