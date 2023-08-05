import { Transporter, createTransport, SendMailOptions } from 'nodemailer';

export class EmailService {
  private readonly transporter: Transporter;

  public constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: '',
      },
    });
  }

  async sendMail(mailOptions: SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Failed to send email.');
    }
  }
}
