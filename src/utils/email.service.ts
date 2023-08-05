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

export class EmailService {
  private readonly transporter: Transporter;
  private readonly logger: Logger;
  public constructor() {
    this.transporter = createTransport({
      service: NodemailerService.GMAIL,
      auth: { user: config().nodemailer.user, pass: config().nodemailer.pass },
    });
    this.logger = Logger.getLogger();
  }

  async sendMail(mailOptions: SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.warn(`Failed to send email with options: ${JSON.stringify(mailOptions)}`, { system: 'email' });
      throw new HttpException({ status: 500, errorCode: 'UNEXPECTED_ERROR', errorMessage: { ar: 'ar', en: 'en', fr: 'fr' } });
    }
  }
}
